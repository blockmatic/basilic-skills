import { access, readdir, readFile, stat } from 'node:fs/promises'
import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const skillsRoot = join(root, 'skills')
const expectedInstallableCount = 30
const expectedPlaybookCount = 50

const namePattern = /^[a-z0-9-]+$/
const errors = []

const toPosix = path => path.split('\\').join('/')

const parseFrontmatter = content => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const block = match[1]
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim()
  const descriptionBlock = block.match(/^description:\s*([\s\S]*?)(?=^[a-zA-Z-]+:|\s*$)/m)
  const descriptionLine = block.match(/^description:\s*(.*)$/m)?.[1]?.trim()
  const disableModelInvocation = block.match(/^disable-model-invocation:\s*(true|false)\s*$/m)?.[1]

  return {
    name,
    descriptionLine,
    descriptionBlock: descriptionBlock?.[1] ?? '',
    disableModelInvocation,
  }
}

const walkSkillFiles = async (dir, files = []) => {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) await walkSkillFiles(path, files)
    else if (entry.name === 'SKILL.md') files.push(path)
  }
  return files
}

const loadGroupedSkillNames = async () => {
  const config = JSON.parse(await readFile(join(root, 'skills.sh.json'), 'utf8'))
  return config.groupings.flatMap(group => group.skills)
}

const classify = rel => {
  const posix = toPosix(rel)
  if (/^skills\/[^/]+\/SKILL\.md$/.test(posix)) return 'installable'
  if (/^skills\/b\/[^/]+\/SKILL\.md$/.test(posix)) return 'playbook'
  return 'other'
}

const skillFiles = await walkSkillFiles(skillsRoot)
const groupedNames = await loadGroupedSkillNames()
const seenNames = new Set()
const installableNames = new Set()
const playbookNames = new Set()

for (const file of skillFiles) {
  const rel = relative(root, file)
  const kind = classify(rel)
  const folderName = basename(dirname(file))
  const content = await readFile(file, 'utf8')
  const frontmatter = parseFrontmatter(content)

  if (kind === 'other') {
    errors.push(`${rel}: SKILL.md must be skills/<name>/SKILL.md or skills/b/<name>/SKILL.md`)
    continue
  }

  if (!frontmatter) {
    errors.push(`${rel}: missing YAML frontmatter`)
    continue
  }

  const { name, descriptionLine, descriptionBlock, disableModelInvocation } = frontmatter

  if (!name) {
    errors.push(`${rel}: missing name in frontmatter`)
  } else if (name !== folderName) {
    errors.push(`${rel}: name "${name}" does not match folder "${folderName}"`)
  } else if (!namePattern.test(name)) {
    errors.push(`${rel}: name "${name}" has invalid characters`)
  } else if (kind === 'playbook' && !name.startsWith('b-')) {
    errors.push(`${rel}: playbook name must start with "b-"`)
  } else if (seenNames.has(name)) {
    errors.push(`${rel}: duplicate skill name "${name}"`)
  } else {
    seenNames.add(name)
    if (kind === 'installable') installableNames.add(name)
    else playbookNames.add(name)
  }

  if (!descriptionLine && !descriptionBlock.trim()) {
    errors.push(`${rel}: missing description in frontmatter`)
  } else if (descriptionLine === '|' || descriptionLine === '>') {
    errors.push(`${rel}: description must be a single line, not a YAML block`)
  } else if (descriptionBlock.includes('\n')) {
    errors.push(`${rel}: description must be a single line`)
  } else {
    const description = (descriptionLine || descriptionBlock).trim()
    if (description.length > 1024)
      errors.push(`${rel}: description exceeds 1024 characters (${description.length})`)
  }

  if ((kind === 'playbook' || name === 'b') && disableModelInvocation !== 'true')
    errors.push(`${rel}: playbooks must set disable-model-invocation: true`)

  if (name === 'b' || kind === 'playbook')
    for (const [, target] of content.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(?:[a-z]+:|#|\/)/i.test(target)) continue
      try {
        await access(join(dirname(file), target.split('#')[0]))
      } catch {
        errors.push(`${rel}: missing packaged reference "${target}"`)
      }
    }

  if (content.includes('@cursor/skills'))
    errors.push(`${rel}: contains @cursor/skills reference — use catalog-relative paths`)

  if (kind !== 'playbook' && (content.includes('@repo/') || content.includes('apps/')))
    errors.push(`${rel}: tech skills must not contain @repo/ or apps/ paths`)
}

if (installableNames.size !== expectedInstallableCount)
  errors.push(
    `expected ${expectedInstallableCount} installable skills, found ${installableNames.size}`,
  )

if (playbookNames.size !== expectedPlaybookCount)
  errors.push(`expected ${expectedPlaybookCount} playbooks, found ${playbookNames.size}`)

const groupedSet = new Set(groupedNames)
for (const name of installableNames)
  if (!groupedSet.has(name)) errors.push(`skills.sh.json: skill "${name}" is not in any grouping`)

for (const name of playbookNames)
  if (groupedSet.has(name))
    errors.push(`skills.sh.json: playbook "${name}" must not be listed as an installable skill`)

for (const name of groupedNames)
  if (!installableNames.has(name))
    errors.push(`skills.sh.json: grouped skill "${name}" has no installable SKILL.md`)

if (groupedNames.length !== installableNames.size)
  errors.push(
    `skills.sh.json lists ${groupedNames.length} skills but catalog has ${installableNames.size} installable`,
  )

try {
  const leftoverWorkflow = await stat(join(skillsRoot, 'workflow'))
  if (leftoverWorkflow.isDirectory())
    errors.push('skills/workflow: leftover second workflow tree; keep only skills/b')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

if (!installableNames.has('b')) errors.push('skills/b/SKILL.md: dispatcher is required')

try {
  await access(join(skillsRoot, 'b', 'references', 'authoring.md'))
  await access(join(skillsRoot, 'b', 'references', 'completion.md'))
} catch {
  errors.push('skills/b/references: packaged authoring.md and completion.md are required')
}

if (errors.length) {
  console.error('Catalog validation failed:\n')
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

console.log(
  `Catalog OK: ${installableNames.size} installable, ${playbookNames.size} playbooks, skills.sh.json in sync`,
)

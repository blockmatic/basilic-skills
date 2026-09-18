import { access, readdir, readFile } from 'node:fs/promises'
import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const skillsRoot = join(root, 'skills')
const expectedInstallableCount = 42
const namePattern = /^w-[a-z0-9-]+$/
const errors = []

/** @param {string} path */
const toPosix = path => path.split('\\').join('/')

/** @param {string} content */
const parseFrontmatter = content => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const block = match?.[1]
  if (!block) return null
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

/**
 * @param {string} dir
 * @param {string[]} [files]
 */
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
  /** @type {{ groupings: { skills: string[] }[] }} */
  const config = JSON.parse(await readFile(join(root, 'skills.sh.json'), 'utf8'))
  return config.groupings.flatMap(group => group.skills)
}

const skillFiles = await walkSkillFiles(skillsRoot)
const groupedNames = await loadGroupedSkillNames()
const seenNames = new Set()
const installableNames = new Set()

for (const file of skillFiles) {
  const rel = relative(root, file)
  const posix = toPosix(rel)
  const installable = /^skills\/[^/]+\/SKILL\.md$/.test(posix)
  const folderName = basename(dirname(file))
  const content = await readFile(file, 'utf8')
  const frontmatter = parseFrontmatter(content)

  if (!installable) {
    errors.push(`${rel}: SKILL.md must be skills/<name>/SKILL.md`)
    continue
  }

  if (!frontmatter) {
    errors.push(`${rel}: missing YAML frontmatter`)
    continue
  }

  const { name, descriptionLine, descriptionBlock, disableModelInvocation } = frontmatter

  if (!name) errors.push(`${rel}: missing name in frontmatter`)
  else if (name !== folderName) errors.push(`${rel}: name "${name}" does not match folder "${folderName}"`)
  else if (!namePattern.test(name)) errors.push(`${rel}: name "${name}" must match ${namePattern}`)
  else if (seenNames.has(name)) errors.push(`${rel}: duplicate skill name "${name}"`)
  else {
    seenNames.add(name)
    installableNames.add(name)
  }

  if (!descriptionLine && !descriptionBlock.trim()) errors.push(`${rel}: missing description in frontmatter`)
  else if (descriptionLine === '|' || descriptionLine === '>')
    errors.push(`${rel}: description must be a single line, not a YAML block`)
  else if (descriptionBlock.includes('\n')) errors.push(`${rel}: description must be a single line`)
  else {
    const description = (descriptionLine || descriptionBlock).trim()
    if (description.length > 1024)
      errors.push(`${rel}: description exceeds 1024 characters (${description.length})`)
  }

  if (disableModelInvocation !== 'true')
    errors.push(`${rel}: playbooks must set disable-model-invocation: true`)

  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1]
    if (!target || /^(?:[a-z]+:|#|\/)/i.test(target)) continue
    const href = target.split('#')[0]
    if (!href) continue
    try {
      await access(join(dirname(file), href))
    } catch {
      errors.push(`${rel}: missing packaged reference "${target}"`)
    }
  }

  if (content.includes('@cursor/skills'))
    errors.push(`${rel}: contains @cursor/skills reference — use catalog-relative paths`)
}

if (installableNames.size !== expectedInstallableCount)
  errors.push(`expected ${expectedInstallableCount} installable skills, found ${installableNames.size}`)

const groupedSet = new Set(groupedNames)
for (const name of installableNames)
  if (!groupedSet.has(name)) errors.push(`skills.sh.json: skill "${name}" is not in any grouping`)

for (const name of groupedNames)
  if (!installableNames.has(name))
    errors.push(`skills.sh.json: grouped skill "${name}" has no installable SKILL.md`)

if (groupedNames.length !== installableNames.size)
  errors.push(
    `skills.sh.json lists ${groupedNames.length} skills but catalog has ${installableNames.size} installable`,
  )

if (errors.length) {
  console.error('Catalog validation failed:\n')
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

console.log(`Catalog OK: ${installableNames.size} installable skills, skills.sh.json in sync`)

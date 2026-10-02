import { access, readdir, readFile } from 'node:fs/promises'
import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const skillsRoot = join(root, 'skills', 'workflow')
const skillsTop = join(root, 'skills')
const expectedPlaybookCount = 45
const playbookNamePattern = /^w-[a-z0-9-]+$/
const standaloneNamePattern = /^[a-z0-9-]+$/
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

/** @param {string} file @param {object} frontmatter */
const validateDescription = (file, _content, frontmatter) => {
  const { descriptionLine, descriptionBlock } = frontmatter
  const rel = relative(root, file)
  if (!descriptionLine && !descriptionBlock.trim()) errors.push(`${rel}: missing description in frontmatter`)
  else if (descriptionLine === '|' || descriptionLine === '>')
    errors.push(`${rel}: description must be a single line, not a YAML block`)
  else if (descriptionBlock.includes('\n')) errors.push(`${rel}: description must be a single line`)
  else {
    const description = (descriptionLine || descriptionBlock).trim()
    if (description.length > 1024)
      errors.push(`${rel}: description exceeds 1024 characters (${description.length})`)
  }
}

/** @param {string} file @param {string} content */
const validatePackagedReferences = async (file, content) => {
  const rel = relative(root, file)
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

const groupedNames = await loadGroupedSkillNames()
const seenNames = new Set()
const installableNames = new Set()

const skillFiles = await walkSkillFiles(skillsRoot)

for (const file of skillFiles) {
  const rel = relative(root, file)
  const posix = toPosix(rel)
  const isPack = posix === 'skills/workflow/SKILL.md'
  const installable = isPack || /^skills\/workflow\/[^/]+\/SKILL\.md$/.test(posix)
  const folderName = isPack ? 'workflow' : basename(dirname(file))
  const content = await readFile(file, 'utf8')
  const frontmatter = parseFrontmatter(content)

  if (!installable) {
    errors.push(`${rel}: SKILL.md must be skills/workflow/SKILL.md or skills/workflow/<name>/SKILL.md`)
    continue
  }

  if (!frontmatter) {
    errors.push(`${rel}: missing YAML frontmatter`)
    continue
  }

  const { name, disableModelInvocation } = frontmatter

  if (!name) errors.push(`${rel}: missing name in frontmatter`)
  else if (name !== folderName) errors.push(`${rel}: name "${name}" does not match folder "${folderName}"`)
  else if (isPack && name !== 'workflow') errors.push(`${rel}: pack name must be workflow`)
  else if (!isPack && !playbookNamePattern.test(name))
    errors.push(`${rel}: name "${name}" must match ${playbookNamePattern}`)
  else if (seenNames.has(name)) errors.push(`${rel}: duplicate skill name "${name}"`)
  else {
    seenNames.add(name)
    installableNames.add(name)
  }

  validateDescription(file, content, frontmatter)

  if (disableModelInvocation !== 'true')
    errors.push(`${rel}: playbooks must set disable-model-invocation: true`)

  await validatePackagedReferences(file, content)
}

const topEntries = await readdir(skillsTop, { withFileTypes: true })
for (const entry of topEntries) {
  if (!entry.isDirectory() || entry.name === 'workflow') continue
  const file = join(skillsTop, entry.name, 'SKILL.md')
  const folderName = entry.name
  let content
  try {
    content = await readFile(file, 'utf8')
  } catch {
    errors.push(`skills/${folderName}/SKILL.md: missing standalone skill file`)
    continue
  }
  const rel = relative(root, file)
  const frontmatter = parseFrontmatter(content)

  if (!frontmatter) {
    errors.push(`${rel}: missing YAML frontmatter`)
    continue
  }

  const { name, disableModelInvocation } = frontmatter

  if (!name) errors.push(`${rel}: missing name in frontmatter`)
  else if (name !== folderName) errors.push(`${rel}: name "${name}" does not match folder "${folderName}"`)
  else if (!standaloneNamePattern.test(name))
    errors.push(`${rel}: name "${name}" must match ${standaloneNamePattern}`)
  else if (seenNames.has(name)) errors.push(`${rel}: duplicate skill name "${name}"`)
  else {
    seenNames.add(name)
    installableNames.add(name)
  }

  validateDescription(file, content, frontmatter)

  if (disableModelInvocation === 'true')
    errors.push(`${rel}: standalone skills must not set disable-model-invocation: true`)

  await validatePackagedReferences(file, content)
}

const skillDirs = await readdir(skillsRoot, { withFileTypes: true })
const gitPublishPaths = []
for (const entry of skillDirs) {
  if (!entry.isDirectory()) continue
  const gitPublishPath = join(skillsRoot, entry.name, 'references', 'git-publish.md')
  try {
    await access(gitPublishPath)
    gitPublishPaths.push(gitPublishPath)
  } catch {
    // not every playbook ships git-publish.md
  }
}

if (gitPublishPaths.length) {
  const gitPublishContents = await Promise.all(gitPublishPaths.map(path => readFile(path, 'utf8')))
  const canonical = gitPublishContents[0]
  if (!canonical.includes('git fetch origin') || !canonical.includes('--no-track origin/main'))
    errors.push('git-publish.md must require `git fetch origin` then branch from `origin/main`')
  for (const [index, content] of gitPublishContents.entries())
    if (content !== canonical)
      errors.push(
        `${toPosix(relative(root, gitPublishPaths[index]))}: git-publish.md must match ${toPosix(relative(root, gitPublishPaths[0]))}`,
      )
}

const playbookNames = [...installableNames].filter(name => name.startsWith('w-'))

if (!installableNames.has('workflow')) errors.push('skills/workflow/SKILL.md pack is missing')
if (playbookNames.length !== expectedPlaybookCount)
  errors.push(`expected ${expectedPlaybookCount} playbooks, found ${playbookNames.length}`)

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

const standaloneCount = installableNames.size - 1 - playbookNames.length
console.log(
  `Catalog OK: workflow pack + ${playbookNames.length} playbooks + ${standaloneCount} standalone skill(s), skills.sh.json in sync`,
)

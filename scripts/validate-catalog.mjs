import { readFile, readdir } from 'node:fs/promises'
import { join, basename, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const skillsRoot = join(root, 'skills')
const expectedSkillCount = 76

const namePattern = /^[a-z0-9-]+$/
const errors = []

const parseFrontmatter = (content) => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const block = match[1]
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim()
  const descriptionBlock = block.match(/^description:\s*([\s\S]*?)(?=^[a-zA-Z-]+:|\s*$)/m)
  const descriptionLine = block.match(/^description:\s*(.*)$/m)?.[1]?.trim()

  return { name, descriptionLine, descriptionBlock: descriptionBlock?.[1] ?? '' }
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
  return config.groupings.flatMap((group) => group.skills)
}

const skillFiles = await walkSkillFiles(skillsRoot)
const groupedNames = await loadGroupedSkillNames()
const seenNames = new Set()

if (skillFiles.length !== expectedSkillCount)
  errors.push(`expected ${expectedSkillCount} SKILL.md files, found ${skillFiles.length}`)

for (const file of skillFiles) {
  const rel = relative(root, file)
  const folderName = basename(dirname(file))
  const content = await readFile(file, 'utf8')
  const frontmatter = parseFrontmatter(content)

  if (!frontmatter) {
    errors.push(`${rel}: missing YAML frontmatter`)
    continue
  }

  const { name, descriptionLine, descriptionBlock } = frontmatter

  if (!name) errors.push(`${rel}: missing name in frontmatter`)
  else if (name !== folderName)
    errors.push(`${rel}: name "${name}" does not match folder "${folderName}"`)
  else if (!namePattern.test(name))
    errors.push(`${rel}: name "${name}" has invalid characters`)
  else if (seenNames.has(name)) errors.push(`${rel}: duplicate skill name "${name}"`)
  else seenNames.add(name)

  if (!descriptionLine && !descriptionBlock.trim())
    errors.push(`${rel}: missing description in frontmatter`)
  else if (descriptionLine === '|' || descriptionLine === '>')
    errors.push(`${rel}: description must be a single line, not a YAML block`)
  else if (descriptionBlock.includes('\n'))
    errors.push(`${rel}: description must be a single line`)
  else {
    const description = (descriptionLine || descriptionBlock).trim()
    if (description.length > 1024)
      errors.push(`${rel}: description exceeds 1024 characters (${description.length})`)
  }

  if (content.includes('@cursor/skills'))
    errors.push(`${rel}: contains @cursor/skills reference — use catalog-relative paths`)

  const isWorkflow = rel.startsWith('skills/workflow/')
  if (!isWorkflow && (content.includes('@repo/') || content.includes('apps/')))
    errors.push(`${rel}: tech skills must not contain @repo/ or apps/ paths`)
}

const groupedSet = new Set(groupedNames)
for (const name of seenNames) {
  if (!groupedSet.has(name)) errors.push(`skills.sh.json: skill "${name}" is not in any grouping`)
}

for (const name of groupedNames) {
  if (!seenNames.has(name)) errors.push(`skills.sh.json: grouped skill "${name}" has no SKILL.md`)
}

if (groupedNames.length !== seenNames.size)
  errors.push(
    `skills.sh.json lists ${groupedNames.length} skills but catalog has ${seenNames.size}`,
  )

if (errors.length) {
  console.error('Catalog validation failed:\n')
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

console.log(`Catalog OK: ${seenNames.size} skills, frontmatter valid, skills.sh.json in sync`)

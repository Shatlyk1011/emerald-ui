#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const COMPONENTS_DIR = 'src/components/emerald-ui-components/'
const GENERATED_PATHS = ['public/r', 'public/llms.txt']

function run(command, args) {
  return execFileSync(command, args, { encoding: 'utf8' }).trim()
}

function getStagedAddedFiles() {
  const output = run('git', [
    'diff',
    '--cached',
    '--name-status',
    '--diff-filter=A',
  ])

  if (!output) {
    return []
  }

  return output
    .split('\n')
    .map((line) => line.split('\t').slice(1).join('\t'))
    .filter((filePath) => filePath.startsWith(COMPONENTS_DIR))
}

function getGeneratedStatus() {
  return run('git', ['status', '--short', '--', ...GENERATED_PATHS])
}

async function hashFile(filePath) {
  const buffer = await readFile(filePath)
  return createHash('sha1').update(buffer).digest('hex')
}

async function collectSnapshotEntries(targetPath) {
  let fileStats

  try {
    fileStats = await stat(targetPath)
  } catch {
    return []
  }

  if (fileStats.isDirectory()) {
    const entries = await readdir(targetPath, { withFileTypes: true })
    const snapshots = await Promise.all(
      entries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((entry) =>
          collectSnapshotEntries(path.join(targetPath, entry.name))
        )
    )

    return snapshots.flat()
  }

  return [`${targetPath}:${await hashFile(targetPath)}`]
}

async function getGeneratedSnapshot() {
  const snapshots = await Promise.all(
    GENERATED_PATHS.map((targetPath) => collectSnapshotEntries(targetPath))
  )

  return snapshots.flat().sort().join('\n')
}

async function main() {
  const addedComponentFiles = getStagedAddedFiles()

  if (addedComponentFiles.length === 0) {
    process.exit(0)
  }

  console.log('New Emerald UI component files detected in the commit:')
  for (const filePath of addedComponentFiles) {
    console.log(`- ${filePath}`)
  }

  const statusBeforeBuild = getGeneratedStatus()
  const snapshotBeforeBuild = await getGeneratedSnapshot()

  console.log(
    '\nRunning `pnpm build-registry` to verify generated registry assets...'
  )
  execFileSync('pnpm', ['build-registry'], { stdio: 'inherit' })

  const statusAfterBuild = getGeneratedStatus()
  const snapshotAfterBuild = await getGeneratedSnapshot()

  if (
    statusAfterBuild !== statusBeforeBuild ||
    snapshotAfterBuild !== snapshotBeforeBuild
  ) {
    console.error(
      '\n`pnpm build-registry` changed generated files. Please review and stage the updated registry output before committing.'
    )
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

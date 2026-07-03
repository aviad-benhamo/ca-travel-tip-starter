import { mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

const ROOT_DIR = process.cwd()
const JS_DIR = path.join(ROOT_DIR, 'js')
const HTML_ENTRY = path.join(ROOT_DIR, 'index.html')
const UNTRACKED_RUNTIME_FILES = [
  path.join(ROOT_DIR, '.env'),
  path.join(ROOT_DIR, 'js', 'config.js'),
]
const CHECK_TARGETS = [
  path.join(ROOT_DIR, 'scripts', 'generate-config.mjs'),
]

async function main() {
  const jsFiles = await collectFiles(JS_DIR, filePath => filePath.endsWith('.js') && path.basename(filePath) !== 'config.js')
  CHECK_TARGETS.push(...jsFiles)

  await assertFileExists(HTML_ENTRY, 'Missing HTML entry file')
  await assertHtmlReferencesExist(HTML_ENTRY)
  await assertFilesAreUntracked(UNTRACKED_RUNTIME_FILES)
  await assertJsSyntax(CHECK_TARGETS)

  console.log(`Validated ${CHECK_TARGETS.length} JavaScript files and HTML asset references.`)
}

async function collectFiles(dirPath, predicate) {
  const entries = await readdir(dirPath, { withFileTypes: true })
  const filePaths = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) return collectFiles(entryPath, predicate)
    return predicate(entryPath) ? [entryPath] : []
  }))

  return filePaths.flat()
}

async function assertHtmlReferencesExist(htmlPath) {
  const html = await readFile(htmlPath, 'utf8')
  const assetPaths = [
    ...matchAttributeValues(html, /<link[^>]+href="([^"]+)"/g),
    ...matchAttributeValues(html, /<script[^>]+src="([^"]+)"/g),
  ]

  for (const assetPath of assetPaths) {
    if (/^(https?:)?\/\//.test(assetPath)) continue
    const resolvedPath = path.resolve(path.dirname(htmlPath), assetPath)
    await assertFileExists(resolvedPath, `Missing asset referenced from index.html: ${assetPath}`)
  }
}

function matchAttributeValues(source, pattern) {
  return Array.from(source.matchAll(pattern), match => match[1])
}

async function assertJsSyntax(filePaths) {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'ca-travel-tip-check-'))

  try {
    for (const filePath of filePaths) {
      const source = await readFile(filePath, 'utf8')
      const tempFilePath = path.join(tempDir, `${path.basename(filePath, path.extname(filePath))}.mjs`)
      await writeFile(tempFilePath, source, 'utf8')
      await runNodeCheck(tempFilePath, filePath)
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

function runNodeCheck(tempFilePath, originalFilePath) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--check', tempFilePath], {
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stderr = ''
    child.stderr.on('data', chunk => {
      stderr += chunk.toString()
    })

    child.on('exit', code => {
      if (code === 0) return resolve()
      reject(new Error(`Syntax check failed for ${path.relative(ROOT_DIR, originalFilePath)}\n${stderr.trim()}`))
    })
    child.on('error', reject)
  })
}

async function assertFileExists(filePath, message) {
  try {
    const info = await stat(filePath)
    if (!info.isFile()) throw new Error()
  } catch {
    throw new Error(`${message}: ${path.relative(ROOT_DIR, filePath)}`)
  }
}

async function assertFilesAreUntracked(filePaths) {
  for (const filePath of filePaths) {
    const isTracked = await checkIfTracked(filePath)
    if (isTracked) {
      throw new Error(`Runtime config file must not be tracked: ${path.relative(ROOT_DIR, filePath)}`)
    }
  }
}

function checkIfTracked(filePath) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['ls-files', '--error-unmatch', path.relative(ROOT_DIR, filePath)], {
      cwd: ROOT_DIR,
      stdio: 'ignore',
    })

    child.on('exit', code => {
      if (code === 0) return resolve(true)
      if (code === 1) return resolve(false)
      reject(new Error(`Could not determine git tracking state for ${path.relative(ROOT_DIR, filePath)}`))
    })
    child.on('error', reject)
  })
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})

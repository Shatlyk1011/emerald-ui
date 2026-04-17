import path from 'path'
import type { z } from 'zod'
import type { registryItemFileSchema } from '@/registry/schema'
import { promises as fs } from 'fs'
import { glob } from 'glob'
import { registry } from '../registry/index'

const REGISTRY_BASE_PATH = process.cwd()
// Source folder where the actual component files live
const SRC_FOLDER = 'src'
const PUBLIC_FOLDER_BASE_PATH = 'public/r'
// Site branding
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const SITE_NAME = 'Emerald UI'
const SITE_DESCRIPTION =
  'A collection of stunning UI components built with Next.js, React, Tailwind CSS, GSAP, and Motion.'
const SITE_GITHUB = 'https://github.com/shatlyk1011/emerald-ui'

// Console colors and symbols
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
} as const

const symbols = {
  success: '✓',
  arrow: '→',
  error: '✗',
  dot: '•',
} as const

function printDivider() {
  console.log(`${colors.dim}${'─'.repeat(80)}${colors.reset}\n`)
}

type File = z.infer<typeof registryItemFileSchema>

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath)

  try {
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(filePath, data, 'utf-8')
    console.log(
      `  ${colors.green}${symbols.success}${colors.reset} Output written to ${colors.cyan}${filePath}${colors.reset}`
    )
  } catch (error) {
    console.log()
    console.error(
      `  ${colors.red}${symbols.error} Error writing file ${filePath}${colors.reset}`
    )
    console.error(error)
    console.log()
  }
}

interface ComponentInfo {
  name: string
  title: string
  description: string
}

const extractFrontmatter = (
  content: string
): { title?: string; description?: string } => {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return {}

  const frontmatter = frontmatterMatch[1]
  const titleMatch = frontmatter.match(/title:\s*(.+)/)
  const descriptionMatch = frontmatter.match(/description:\s*(.+)/)

  return {
    title: titleMatch?.[1]?.trim(),
    description: descriptionMatch?.[1]?.trim(),
  }
}

const getComponentsInfo = async (): Promise<ComponentInfo[]> => {
  try {
    // Docs live under src/content/docs/** in this project
    const mdxFiles = await glob('src/content/docs/**/*.mdx', {
      cwd: REGISTRY_BASE_PATH,
      ignore: ['src/content/docs/index.mdx'],
    })
    const components: ComponentInfo[] = []

    for (const mdxFile of mdxFiles) {
      try {
        const content = await fs.readFile(
          path.join(REGISTRY_BASE_PATH, mdxFile),
          'utf-8'
        )
        const frontmatter = extractFrontmatter(content)

        if (frontmatter.title && frontmatter.description) {
          const name = path.basename(mdxFile, '.mdx')
          components.push({
            name,
            title: frontmatter.title,
            description: frontmatter.description,
          })
        }
      } catch (error) {
        console.error(
          `    ${colors.red}${symbols.error} Error reading MDX file ${mdxFile}${colors.reset}`
        )
      }
    }

    return components.sort((a, b) => a.title.localeCompare(b.title))
  } catch (error) {
    console.error(
      `  ${colors.red}${symbols.error} Error getting component info${colors.reset}`
    )
    return []
  }
}

const generateLLMsFile = async (components: ComponentInfo[]): Promise<void> => {
  const llmsContent = `# ${SITE_NAME} - UI Component Library

${SITE_DESCRIPTION}

## Components

${components
  .map(
    (component) =>
      `**${component.title}** - ${component.description}\n${SITE_URL}/docs/components/${component.name}`
  )
  .join('\n\n')}

## Links

- Website: ${SITE_URL}
- Github: ${SITE_GITHUB}
- Sitemap: ${SITE_URL}/sitemap.xml

`

  try {
    await fs.writeFile(
      path.join(REGISTRY_BASE_PATH, 'public/llms.txt'),
      llmsContent,
      'utf-8'
    )
    console.log(
      `  ${colors.green}${symbols.success}${colors.reset} LLMs.txt file updated with ${components.length} components`
    )
  } catch (error) {
    console.error(
      `  ${colors.red}${symbols.error} Error writing LLMs.txt file${colors.reset}`
    )
    console.error(error)
  }
}

const getComponentFiles = async (files: File[], registryType: string) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    try {
      if (typeof file === 'string') {
        const normalizedPath = file.startsWith('/') ? file : `/${file}`
        // Files live inside the src/ folder in this project
        const filePath = path.join(
          REGISTRY_BASE_PATH,
          SRC_FOLDER,
          normalizedPath
        )
        const fileContent = await fs.readFile(filePath, 'utf-8')

        const fileName = normalizedPath.split('/').pop() || ''
        console.log(
          `    ${colors.yellow}${symbols.dot}${colors.reset} Processing ${colors.cyan}${fileName}${colors.reset}`
        )

        return {
          type: registryType,
          content: fileContent,
          path: normalizedPath,
          target: `components/ui/${fileName}`,
        }
      }

      const normalizedPath = file.path.startsWith('/')
        ? file.path
        : `/${file.path}`
      // Files live inside the src/ folder in this project
      const filePath = path.join(REGISTRY_BASE_PATH, SRC_FOLDER, normalizedPath)
      const fileContent = await fs.readFile(filePath, 'utf-8')

      const fileName = normalizedPath.split('/').pop() || ''
      console.log(
        `    ${colors.yellow}${symbols.dot}${colors.reset} Processing ${colors.cyan}${fileName}${colors.reset}`
      )

      const getTargetPath = (type: string) => {
        switch (type) {
          case 'registry:hook':
            return `hooks/${fileName}`
          case 'registry:lib':
            return `lib/${fileName}`
          case 'registry:block':
            return `blocks/${fileName}`
          default:
            return `components/ui/${fileName}`
        }
      }

      const fileType =
        typeof file === 'string' ? registryType : file.type || registryType

      return {
        type: fileType,
        content: fileContent,
        path: normalizedPath,
        target:
          typeof file === 'string'
            ? getTargetPath(registryType)
            : file.target || getTargetPath(fileType),
      }
    } catch (error) {
      console.error(
        `    ${colors.red}${symbols.error} Error processing file: ${typeof file === 'string' ? file : file.path}${colors.reset}`
      )
      throw error
    }
  })

  const filesArray = await Promise.all(filesArrayPromises)
  return filesArray
}

const main = async () => {
  console.log(`\n${colors.cyan}Registry Build Process${colors.reset}`)
  printDivider()

  const totalComponents = registry.length

  for (let i = 0; i < registry.length; i++) {
    const component = registry[i]
    const files = component.files
    if (!files) throw new Error('No files found for component')

    console.log(
      `${colors.yellow}${symbols.arrow} Component ${i + 1}/${totalComponents}: ${colors.reset}${component.name}`
    )

    const filesArray = await getComponentFiles(files, component.type)
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`

    await writeFileRecursive(
      jsonPath,
      JSON.stringify({ ...component, files: filesArray }, null, 2)
    )

    if (i < registry.length - 1) {
      console.log() // Add space between components
    }
  }

  printDivider()

  // Generate LLMs.txt file
  console.log(
    `${colors.yellow}${symbols.arrow} Generating LLMs.txt file${colors.reset}`
  )
  const componentsInfo = await getComponentsInfo()
  await generateLLMsFile(componentsInfo)

  printDivider()
}

main()
  .then(() => {
    console.log(
      `${colors.green}${symbols.success} Registry build completed successfully!${colors.reset}\n`
    )
  })
  .catch((err) => {
    console.log()
    console.error(
      `${colors.red}${symbols.error} Registry build failed:${colors.reset}`
    )
    console.error(err)
    console.log()
    process.exit(1)
  })

import { siteConfig } from '@/lib/site-config'
import { gsapSource, plainSource } from '@/lib/source'
import fs from 'fs'
import path from 'path'
import RSS from 'rss'

const siteUrl =
  process.env.LOCAL === 'true'
    ? 'http://localhost:123'
    : 'https://www.emerald-ui.com'
      
export async function generateRssFeed() {
  const allPages = [...plainSource.getPages(), ...gsapSource.getPages()]
  
  // Deduplicate pages based on url
  const uniquePages = allPages.filter(
    (page, index, self) =>
      index === self.findIndex((p) => p.url === page.url)
  )

  const feedOptions = {
    title: siteConfig.name,
    description: siteConfig.description,
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    image_url: siteConfig.ogImage,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)

  uniquePages.forEach((page) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pageAny = page as any
        const relativePath = pageAny.absolutePath || pageAny.file?.absolutePath || pageAny.file?.path
        
        if (!relativePath) {
            console.warn(`Skipping page ${page.url}: No file path found`)
            return
        }

        const fullPath = path.isAbsolute(relativePath) ? relativePath : path.resolve(process.cwd(), relativePath)

        if (fs.existsSync(fullPath)) {
            const fileContent = fs.readFileSync(fullPath, 'utf-8')
            const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/)
            
            if (frontmatterMatch) {
                const frontmatterRaw = frontmatterMatch[1]
                const titleMatch = frontmatterRaw.match(/title:\s*(.*)/)
                const descriptionMatch = frontmatterRaw.match(/description:\s*(.*)/)
                
                const title = titleMatch ? titleMatch[1].trim() : 'No Title'
                const description = descriptionMatch ? descriptionMatch[1].trim() : ''

                feed.item({
                    title: title,
                    description: description,
                    url: `${siteUrl}${page.url}`,
                    date: new Date(), 
                })
            }
        }
    } catch (e) {
        console.error(`Error processing page ${page.url}:`, e)
    }
  })
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }))
}



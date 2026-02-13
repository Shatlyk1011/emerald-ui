import { generateRssFeed } from './generate-rss-feed'

generateRssFeed()
  .then(() => console.log('✅ RSS feed generated successfully'))
  .catch((error) => {
    console.error('❌ Failed to generate RSS feed:', error)
    process.exit(1)
  })

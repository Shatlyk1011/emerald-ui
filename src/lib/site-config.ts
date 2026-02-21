export const siteConfig = {
  name: 'UI Design App',
  description: 'A modern UI design application with AI capabilities.',
  revalidateTime: 3600,
  github: 'https://github.com/shatlyk1011',
  siteUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ogImage: 'https://emerald-ui.com/og.jpg',
  totalComponents: '40+',
}

export type SiteConfig = typeof siteConfig

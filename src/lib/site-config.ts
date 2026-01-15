export const siteConfig = {
  name: 'UI Design App',
  description: 'A modern UI design application with AI capabilities.',
  revalidateTime: 3600,
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: 'https://ui-design-app.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/ui_design_app',
    github: 'https://github.com/ui-design-app',
  },
}

export type SiteConfig = typeof siteConfig

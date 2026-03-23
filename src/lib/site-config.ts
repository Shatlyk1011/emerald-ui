const totalComponents = 46

export const siteConfig = {
  name: 'Emerald UI - Inspiration Websites & Components',
  description: `A modern UI design inspiration websites and collection of ${totalComponents}+ components free and open source built with Next.js, React, Tailwind CSS, GSAP, and Motion.',
  revalidateTime: 3600`,
  github: 'https://github.com/shatlyk1011',
  siteUrl: 'https://emerald-ui.com',
  ogImage: 'https://emerald-ui.com/opengraph-image.png',
  totalComponents,
}

export type SiteConfig = typeof siteConfig

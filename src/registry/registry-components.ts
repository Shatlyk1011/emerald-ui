import type { Registry } from './schema'

export const component: Registry = [
  // ─── Buttons ──────────────────────────────────────────────────────────────
  {
    name: 'button-colorful',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/buttons/button-colorful.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'diagonal-swipe-button',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/buttons/diagonal-swipe-button.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'gradient-borders-button',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/buttons/gradient-borders-button.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'hover-border-gradient',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/buttons/hover-border-gradient.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'interactive-hover-button',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    files: [
      {
        path: 'components/emerald-ui-components/buttons/interactive-hover-button.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'motion-button',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    files: [
      {
        path: 'components/emerald-ui-components/buttons/motion-button.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'shimmer-button',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/buttons/shimmer-button.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'shiny-button',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/buttons/shiny-button.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'social-button',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    files: [
      {
        path: 'components/emerald-ui-components/buttons/social-button.tsx',
        type: 'registry:component',
      },
      {
        path: 'hooks/use-click-outside.ts',
        type: 'registry:hook',
      },
    ],
  },

  // ─── Cards ────────────────────────────────────────────────────────────────
  {
    name: 'checkout-card',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    files: [
      {
        path: 'components/emerald-ui-components/cards/checkout-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'job-details-card',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/cards/job-details-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'job-listing-card',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/cards/job-listing-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'profile-card',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/cards/profile-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'stacked-article-cards',
    type: 'registry:component',
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/cards/stacked-article-cards.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'team-member-card',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    files: [
      {
        path: 'components/emerald-ui-components/cards/team-member-card.tsx',
        type: 'registry:component',
      },
    ],
  },

  // ─── GSAP Components ──────────────────────────────────────────────────────
  {
    name: 'color-text-reveal',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react', 'next-themes'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/color-text-reveal.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'fancy-text-hover',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/fancy-text-hover.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'interactive-team',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/interactive-team.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'link-hover',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/link-hover.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'magnetic-effect',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/magnetic-effect.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'scroll-text-reveal',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/scroll-text-reveal.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'scroll-text-reveal-v2',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/scroll-text-reveal-v2.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'text-reveal',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/text-reveal.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'gsap-projects-section',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react', 'lucide-react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/gsap-projects-section.tsx',
        type: 'registry:component',
      },
    ],
  },

  {
    name: 'image-trail',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/image-trail.tsx',
        type: 'registry:component',
      },
    ],
  },

  {
    name: 'sticky-cards-section',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/sticky-cards-section.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'morphing-highlighter',
    type: 'registry:component',
    dependencies: ['gsap', '@gsap/react'],
    files: [
      {
        path: 'components/emerald-ui-components/gsap-components/morphing-highlighter.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'tooltip-cat',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/tooltip-cat.tsx',
        type: 'registry:component',
      },
    ],
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  {
    name: 'simple-hero',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/hero/simple-hero.tsx',
        type: 'registry:component',
      },
    ],
  },

  // ─── Pricing ──────────────────────────────────────────────────────────────
  {
    name: 'holographic-pricing-card',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    files: [
      {
        path: 'components/emerald-ui-components/pricing/holographic-pricing-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'node-ui-pricing-card',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    registryDependencies: ['button', 'switch'],
    files: [
      {
        path: 'components/emerald-ui-components/pricing/node-ui-pricing-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'simple-pricing-card',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/pricing/simple-pricing-card.tsx',
        type: 'registry:component',
      },
    ],
  },

  // ─── Footer ───────────────────────────────────────────────────────────────
  {
    name: 'keep-it-touch',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    files: [
      {
        path: 'components/emerald-ui-components/footer/keep-it-touch.tsx',
        type: 'registry:component',
      },
    ],
  },

  // ─── Misc ─────────────────────────────────────────────────────────────────
  {
    name: '3d-marquee',
    type: 'registry:component',
    dependencies: ['motion'],
    files: [
      {
        path: 'components/emerald-ui-components/3d-marquee.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'animated-dropdown',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/animated-dropdown.tsx',
        type: 'registry:component',
      },
      {
        path: 'hooks/use-click-outside.ts',
        type: 'registry:hook',
      },
    ],
  },
  {
    name: 'animated-input',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button', 'input'],
    files: [
      {
        path: 'components/emerald-ui-components/animated-input.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'animated-number',
    type: 'registry:component',
    dependencies: ['motion'],
    files: [
      {
        path: 'components/emerald-ui-components/animated-number.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'flip-card',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    files: [
      {
        path: 'components/emerald-ui-components/flip-card.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'gradient-file-upload',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion', 'sonner'],
    registryDependencies: ['button', 'textarea', 'tooltip'],
    files: [
      {
        path: 'components/emerald-ui-components/gradient-file-upload.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'parallax-image',
    type: 'registry:component',
    dependencies: ['motion'],
    files: [
      {
        path: 'components/emerald-ui-components/parallax-image.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'subscribe-input',
    type: 'registry:component',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'components/emerald-ui-components/subscribe-input.tsx',
        type: 'registry:component',
      },
      {
        path: 'hooks/use-click-outside.ts',
        type: 'registry:hook',
      },
    ],
  },

  // Texts component
  {
    name: 'text-scramble',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/texts/text-scramble.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'text-shimmer',
    type: 'registry:component',
    files: [
      {
        path: 'components/emerald-ui-components/texts/text-shimmer.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'text-typing-effect',
    type: 'registry:component',
    dependencies: ['motion'],
    files: [
      {
        path: 'components/emerald-ui-components/texts/text-typing-effect.tsx',
        type: 'registry:component',
      },
    ],
  },
]

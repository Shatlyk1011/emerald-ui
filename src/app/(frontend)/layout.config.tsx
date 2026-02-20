import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Header from '@/components/layout/header'
import Logo from '@/components/ui/logo'

export const baseOptions = (): BaseLayoutProps => ({
  nav: {
    title: (
      <div className='flex items-center'>
        <Logo />
      </div>
    ),
  },
  links: [
    {
      type: 'custom',
      children: <Header isFumadocs />,

    },
  ],
  themeSwitch: { enabled: false },
})

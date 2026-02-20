import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Logo from '@/components/ui/logo'
import Header from '@/components/layout/header'

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

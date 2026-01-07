import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import ThemeToggle from '@/components/ui/theme-toggle'

export const baseOptions = (): BaseLayoutProps => ({
  nav: {
    title: (
      <div className='flex items-center'>
        {/* <Image
          alt='MelonUI Logo'
          className='mr-2'
          height={24}
          src='/logo.svg'
          width={24}
        /> */}
        <span className='hidden items-center text-lg font-bold tracking-tight text-black md:inline-flex dark:text-white'>
          Node UI
        </span>
      </div>
    ),
  },
  themeSwitch: { component: <ThemeToggle /> },
})

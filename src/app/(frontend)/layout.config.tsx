import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Header from '@/components/layout/header'

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
          Emerald UI
        </span>
      </div>
    ),
  },
  links: [
    {
      type: "custom",
      children:<Header isFumadocs />,
    },
  ],
  themeSwitch: { enabled: false },
})

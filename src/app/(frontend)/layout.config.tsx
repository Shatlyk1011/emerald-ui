import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'
import HeaderProSmall from '@/components/layout/header-pro-small'

export const baseOptions = (): BaseLayoutProps => ({
  nav: {
    title: (
      <div className='flex items-center'>
        <Image
          alt='KokonutUI Logo'
          className='mr-2'
          height={24}
          src='/logo.svg'
          width={24}
        />
        <span className='hidden items-center text-lg font-bold tracking-tight text-black md:inline-flex dark:text-white'>
          Kokonut UI
        </span>
      </div>
    ),
  },
})

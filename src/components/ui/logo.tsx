import { FC } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  classes?: string
  size?: 'sm' | 'xl'
}

const Logo: FC<Props> = ({ classes, size }) => {
  return (
    <figure
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-nowrap',
        classes
      )}
    >
      <img
        className={cn('size-5', size === 'xl' && 'size-10')}
        src='/logo.png'
        alt='Emerald UI Logo'
      />
      <span
        className={cn(
          '-tracking-two items-center transition',
          size === 'xl' && 'text-2xl'
        )}
      >
        Emerald UI
      </span>
    </figure>
  )
}
export default Logo

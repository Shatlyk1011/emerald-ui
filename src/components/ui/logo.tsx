import { FC } from 'react'
import { cn } from '@/lib/utils'
import { LogoIcon } from '../icons/LogoIcon'

interface Props {
  classes?: string
  size?: 'sm' | 'xl'
  logoColor?: string
}

const Logo: FC<Props> = ({ classes, size, logoColor }) => {
  return (
    <figure
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-nowrap',
        classes
      )}
    >
      <LogoIcon
        className={cn(
          'size-7',
          logoColor || 'current',
          size === 'xl' && 'size-10'
        )}
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

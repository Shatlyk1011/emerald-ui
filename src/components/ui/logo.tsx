import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props {
  classes?: string
  size?: 'sm' | 'xl'
};

const Logo:FC<Props> = ({ classes, size }) => {
  return (
    <figure className={cn("flex items-center text-sm gap-1.5 text-nowrap font-medium", classes)}>
      <img className={cn('size-5', size === 'xl' && 'size-10')} src="/logo.png" alt="Emerald UI Logo" />
      <span className={cn('items-center -tracking-two transition ', size==="xl" && 'text-2xl')}>
        Emerald UI
      </span>
    </figure>
  )
};
export default Logo
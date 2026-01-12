'use client'

import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  return (
    <Button asChild variant='ghost' size='sm' className='w-full justify-start'>
      <a href='/auth/logout'>Sign Out</a>
    </Button>
  )
}

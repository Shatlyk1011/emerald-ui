'use client'

import { Button } from '@/components/ui/button'

export default function LoginButton() {
  return (
    <Button asChild variant='ghost' size='sm'>
      <a href='/auth/login'>Sign In</a>
    </Button>
  )
}

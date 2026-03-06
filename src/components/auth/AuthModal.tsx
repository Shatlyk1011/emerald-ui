'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'

export default function AuthModal() {
  const router = useRouter()

  const [signIn, setSignIn] = useState(false)

  const handleClose = () => {
    router.back()
  }

  const handleSwitch = () => {
    setSignIn(!signIn)
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className='max-h-max p-0 px-6 max-sm:px-0 sm:max-w-max'>
        <DialogTitle className='sr-only'>Sign In</DialogTitle>
        {!signIn ? (
          <SignInPage isModal handleSwitch={handleSwitch} redirectTo={''} />
        ) : (
          <SignUpPage isModal handleSwitch={handleSwitch} redirectTo={''} />
        )}
      </DialogContent>
    </Dialog>
  )
}

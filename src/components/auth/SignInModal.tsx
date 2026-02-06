'use client'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import SignInPage from './SignInPage'
import { useState } from 'react'
import SignUpPage from './SignUpPage'


export default function SignInModal() {
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
      <DialogContent className=' p-0 sm:max-w-max px-6 max-sm:px-0 max-h-max'>
        {
          !signIn ? (
            <SignInPage isModal handleSwitch={handleSwitch} />
          ) : (
            <SignUpPage isModal handleSwitch={handleSwitch} />
          )
        }
      </DialogContent>
    </Dialog>
  )
}

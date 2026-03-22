'use client'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { toast } from 'sonner'
import { copyComponent } from '@/lib/action'
import { useUser } from './use-user'

interface Props {
  link: string
  isBlock?: boolean
}

const useCopy = ({ link, isBlock = false }: Props) => {
  const posthog = usePostHog()
  const router = useRouter()
  const { user } = useUser()
  const isLogin = !!user
  const pathname = usePathname()

  const isAuthRequired = isBlock && !isLogin

  const [isPending, startTransition] = useTransition()
  const [isCopied, setIsCopied] = useState(false)

  const [state, formAction] = useActionState(copyComponent, {
    error: '',
    content: '',
    success: false,
  })
  const handleCopyClick = async () => {
    if (isAuthRequired) {
      router.push(`/sign-in?next=${encodeURIComponent(pathname)}`)
      toast.info('Please sign in to copy the component.', {
        position: 'top-center',
      })
      return
    }
    const [folder, filename] = link.split('/')

    startTransition(async () => {
      const formData = new FormData()
      formData.append('folder', folder)
      formData.append('fileName', filename)

      formAction(formData)
    })
  }

  useEffect(() => {
    if (state.success && state.content) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCopied(true)
      navigator.clipboard.writeText(state.content)

      posthog.capture('component_copied', {
        component: link,
        type: isBlock ? 'block' : 'component',
      })

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [state])

  return { handleCopyClick, isCopied, isPending, isAuthRequired }
}

export default useCopy

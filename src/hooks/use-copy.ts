'use client'
import { copyComponent } from "@/lib/action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useUser } from "./use-user"

interface Props {
  link: string
  isBlock?:boolean
}

const useCopy = ({ link, isBlock = false }: Props) => {
  const router = useRouter()
  const { user } = useUser()
  console.log('link')
  
  const isLogin = !!user

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
      router.push('/sign-in')
      toast.info('Please sign in to copy the component', {
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

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [state])

  return {handleCopyClick, isCopied, isPending, isAuthRequired}

}

export default useCopy

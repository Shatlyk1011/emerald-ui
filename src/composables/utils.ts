import { User } from '@supabase/supabase-js';




export function debounce<T>(func: (...args: T[]) => void, delay: number) {
  let timeoutId: undefined | ReturnType<typeof setTimeout>

  return function (...args: T[]) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      // @ts-expect-error valid
      func.apply(this, args)
    }, delay)
  }
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getUserInitials = (user: User | null) => {
  if (user?.user_metadata?.full_name) {
    const names = user.user_metadata.full_name.split(' ')
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase()
  }
  if (user?.email) {
    return user.email[0].toUpperCase()
  }
  return 'U'
}

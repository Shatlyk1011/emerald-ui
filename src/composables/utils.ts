import { User } from '@supabase/supabase-js'

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

export function formatDateFull(
  dateString: string,
  options?: {
    relative?: boolean // Show relative time for recent dates (e.g., "2 days ago")
    includeTime?: boolean // Include time in the output
  }
): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  // Show relative time for dates within the last 7 days
  if (options?.relative && diffInDays >= 0 && diffInDays < 7) {
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
        if (diffInMinutes === 0) return 'Just now'
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
      }
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
    }
    if (diffInDays === 1) return 'Yesterday'
    return `${diffInDays} days ago`
  }

  // Format as "Feb 5, 2026" or "Feb 5, 2026, 10:55 PM"
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (options?.includeTime) {
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    return `${formattedDate}, ${formattedTime}`
  }

  return formattedDate
}

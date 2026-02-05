'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { BadgeCheck, User, Image as ImageIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * ProfileCard component props
 */
interface ProfileCardProps {
  name?: string
  title?: string
  imageUrl?: string
  verified?: boolean
  followers?: number
  posts?: number
  isFollowing?: boolean
  onFollowClick?: (isFollowing: boolean) => void
}

/**
 * An elegant user profile card with avatar, verification badge, stats, and follow button.
 * Features smooth animations and hover effects.
 */
export default function ProfileCard({
  name = 'John Doe',
  title = 'Fullstack developer, previously Google and Meta',
  imageUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  verified = true,
  followers = 456,
  posts = 19,
  isFollowing = false,
  onFollowClick,
}: ProfileCardProps) {
  const [following, setFollowing] = useState(isFollowing)

  const handleFollowClick = () => {
    const newState = !following
    setFollowing(newState)
    onFollowClick?.(newState)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-90 rounded-4xl bg-white dark:bg-black p-2 shadow-sm dark:shadow-black/20"
    >
      {/* Profile Image */}
      <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-4xl border-2 border-gray-200 dark:border-black/10">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={imageUrl}
          alt={`${name}'s profile picture`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-6 text-start w-10/12 mx-auto">
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tighter">
            {name}
          </h2>
          {verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <BadgeCheck
                className="h-5 w-5 text-emerald-500"
                aria-label="Verified account"
              />
            </motion.div>
          )}
        </div>

        {/* Title/Description */}
        <p className="mt-2 text-gray-500 dark:text-white/60">{title}</p>

        <div className="my-6 flex items-center justify-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <User
              className="h-5 w-5 text-gray-400 dark:text-white/40"
              aria-hidden="true"
            />
            <span className="text-md font-semibold text-gray-900 dark:text-white">
              {followers.toLocaleString()}
            </span>
          </motion.div>

          {/* Posts Stat */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <ImageIcon
              className="h-5 w-5 text-gray-400 dark:text-white/40"
              aria-label="Posts icon"
            />
            <span className="text-md font-semibold text-gray-900 dark:text-white">
              {posts}
            </span>
          </motion.div>

          {/* Follow Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1"
          >
            <Button
              onClick={handleFollowClick}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-100 dark:bg-white/10 px-6 py-3 text-base font-semibold text-gray-900 dark:text-white transition-colors hover:bg-gray-200 dark:hover:bg-white/20"
              aria-label={following ? `Unfollow ${name}` : `Follow ${name}`}
            >
              {following ? 'Following' : 'Follow'}
              {!following && <Plus className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

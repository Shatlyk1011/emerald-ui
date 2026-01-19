'use client'

import { Sticker } from "lucide-react"
import { InspirationWebsite } from "../../../../payload-types"
import { useAppStore } from "@/store/useAppStore"

interface SiteCardProps {
  item: InspirationWebsite
}

function SiteCard({ item }: SiteCardProps) {
  const isNew = true
  const openSiteDialog = useAppStore((state) => state.openSiteDialog)

  const handleClick = () => {
    openSiteDialog(item)
  }

  return (
    <div
      className='group relative flex cursor-pointer flex-col gap-3'
      role="button"
      onClick={handleClick}
    >
      <div className="py-16 px-8 relative bg-card border-border/50 rounded-xl border shadow-lg transition-colors group-hover:border-border">
        <div className='relative aspect-4/3 w-full overflow-hidden '>
          <figure className='absolute inset-0 overflow-hidden rounded-lg bg-'>
            {item.imgUrl ? (

              <img src={item.imgUrl} className="w-full h-full object-cover" alt={item.title + 'image'}/>
            ) : (
              <span>no image</span>
            )}
          </figure>

          {/* Badges */}

        </div>
        {isNew && (
          <span className='bg-background font-sans text-foreground tracking-four border-border absolute top-3 left-3 rounded-md border px-2 py-2.5 text-xs leading-0 font-semibold uppercase'>
            New
          </span>
        )}
      </div>


      {/* Card Footer */}
      <div className='flex items-start gap-3 px-1'>
        <div className="bg-card mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
          {item.faviconUrl ? (
            <img src={item.faviconUrl} className="w-full h-full object-contain" alt="" />
          ) : (
            <Sticker/>
          )}
        </div>

        <div className='flex flex-col'>
          <h3 className='text-sm leading-tight font-semibold transition-colors group-hover:text-white'>
            {item.title}
          </h3>
          <p className='mt-0.5 text-xs leading-snug text-gray-500'>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SiteCard

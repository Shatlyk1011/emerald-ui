interface SiteCardProps {
  title: string
  description: string
  imageColor: string // Using color placeholder for image to ensure it looks good without external assets
  logoColor: string
  isNew?: boolean
  isLocked?: boolean
  logoLetter: string
}

function SiteCard({ title, description, isNew = false }: SiteCardProps) {
  return (
    <div className='group relative flex cursor-pointer flex-col gap-3'>
      {/* Card Image Area */}
      <div className='bg-card border-border/50 relative aspect-4/3 w-full overflow-hidden rounded-xl border shadow-lg transition-colors group-hover:border-white/10'>
        {/* Mock Preview Content */}
        <div className='absolute inset-4 overflow-hidden rounded-lg bg-[#222]'></div>

        {/* Badges */}
        {isNew && (
          <div className='bg-card tracking-two border-border absolute top-2 left-2 rounded-md border px-2 py-2.5 text-[9px] leading-0 font-semibold uppercase'>
            New
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className='flex items-start gap-3 px-1'>
        <div
          className={`bg-card mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md`}
        >
          <span className='text-xs font-bold'>{'a'}</span>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-sm leading-tight font-semibold transition-colors group-hover:text-white'>
            {title}
          </h3>
          <p className='mt-0.5 text-xs leading-snug text-gray-500'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SiteCard


interface SiteCardProps {
  title: string
  description: string
  imageColor: string // Using color placeholder for image to ensure it looks good without external assets
  logoColor: string
  isNew?: boolean
  isLocked?: boolean
  logoLetter: string
}

function SiteCard({
  title,
  description,
  isNew = false,
}: SiteCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 cursor-pointer">
      {/* Card Image Area */}
      <div className="relative aspect-4/3 w-full bg-card rounded-xl overflow-hidden border border-border/50 group-hover:border-white/10 transition-colors shadow-lg">
        {/* Mock Preview Content */}
        <div className="absolute inset-4 rounded-lg overflow-hidden bg-[#222]">
        </div>

        {/* Badges */}
        {isNew && (
          <div className="absolute top-2 left-2 bg-card text-[9px] font-semibold px-2 rounded-md uppercase tracking-two border border-border leading-0 py-2.5">
            New
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex items-start gap-3 px-1">
        <div
          className={`w-8 h-8 rounded-md bg-card flex items-center justify-center shrink-0 mt-0.5`}
        >
          <span className="font-bold text-xs">{'a'}</span>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm leading-tight group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5 leading-snug">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SiteCard
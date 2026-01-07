import { MOCK_SITES } from '../../../../../public/mockData'

// components
import FilterSection from '@/components/InspirationPage/FilterSection'
import SiteCard from '@/components/InspirationPage/SiteCard'

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-white/20">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* <FilterSection /> */}

        <h2 className="mb-6 text-2xl font-semibold -tracking-two">
          Explore curated websites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6">
          {[...MOCK_SITES, ...MOCK_SITES].map((site, i) => (
            <SiteCard
              key={i}
              title={site.title}
              description={site.description}
              imageColor={site.imageColor}
              logoColor={site.logoColor}
              logoLetter={site.logoLetter}
              isNew={site.isNew}
              isLocked={site.isLocked}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
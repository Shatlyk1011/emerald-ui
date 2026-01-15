import Link from 'next/link'
import { stringify } from "qs-esm";
// components
import FilterSection from '@/components/InspirationPage/FilterSection'
import SiteCard from '@/components/InspirationPage/SiteCard'
import { MOCK_SITES } from '../../../../../public/mockData'
import { useGetWebsites as websites } from '@/services/useGetInspirationSites';

const stringifiedQuery = stringify(
  {
    where: {
      isVisible: {
        equals: true,
      },
    },
    limit: 24,
  },
  { addQueryPrefix: true },
);

export default async function InspirationPage() {
  const { getWebsites } = websites()

  const initialData = await getWebsites(stringifiedQuery)
  console.log('initialData', initialData);

  return (
    <div className='bg-background min-h-screen font-sans text-white selection:bg-white/20'>
      <main className='mx-auto max-w-7xl px-6 py-10'>
        {/* <FilterSection /> */}

        <h2 className='-tracking-two mb-6 text-2xl font-semibold'>
          Explore curated websites
        </h2>

        <div className='grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-4'>
          {[...MOCK_SITES, ...MOCK_SITES].map((site, i) => (
            <Link key={i} href='inspiration/1'>
              <SiteCard
                title={site.title}
                description={site.description}
                imageColor={site.imageColor}
                logoColor={site.logoColor}
                logoLetter={site.logoLetter}
                isNew={site.isNew}
                isLocked={site.isLocked}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

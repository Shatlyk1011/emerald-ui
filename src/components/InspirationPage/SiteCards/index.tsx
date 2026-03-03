import { FC } from 'react'
import { InspirationWebsite } from '@/payload-types'
import EmptyResult from './EmptyResult'
import SiteCard from './SiteCard'

interface Props {
  websites: InspirationWebsite[]
  handleResetFilters: () => void
}

const SiteCards: FC<Props> = ({ websites, handleResetFilters }) => {
  return (
    <>
      <section className='grid grid-cols-3 gap-x-4 gap-y-16 max-xl:grid-cols-2 max-md:gap-y-12 max-sm:grid-cols-1'>
        {websites.map((item, index) => (
          <SiteCard key={item.id} item={item} index={index} />
        ))}
      </section>
      {websites.length === 0 && (
        <EmptyResult handleResetFilters={handleResetFilters} />
      )}
    </>
  )
}

export default SiteCards

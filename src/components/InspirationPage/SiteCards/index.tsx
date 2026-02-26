import { FC } from 'react'
import { InspirationWebsite } from '@/payload-types'
import SiteCard from './SiteCard'

interface Props {
  websites: InspirationWebsite[]
}

const SiteCards: FC<Props> = ({ websites }) => {
  console.log('websites', websites)
  return (
    <section className='grid grid-cols-3 gap-x-4 gap-y-16 max-xl:grid-cols-2 max-sm:grid-cols-1'>
      {websites.map((item, index) => (
        <SiteCard key={item.id} item={item} index={index} />
      ))}
    </section>
  )
}

export default SiteCards

import { FC } from 'react'
import SiteCard from './SiteCard'
import { InspirationWebsite } from '@/payload-types'

interface Props {
  websites: InspirationWebsite[]
}

const SiteCards: FC<Props> = ({ websites }) => {
  return (
    <section className='grid grid-cols-3 gap-x-4 gap-y-16'>
      {websites.map((item) => (
        <SiteCard key={item.id} item={item} />
      ))}
    </section>
  )
}

export default SiteCards

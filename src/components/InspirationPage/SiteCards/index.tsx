import { FC } from 'react'
import { IWebsites } from '@/types/inspiration'
import SiteCard from './SiteCard'

interface Props {
  initialData: IWebsites
}

const SiteCards: FC<Props> = ({ initialData }) => {
  return (
    <section className='grid grid-cols-3 gap-x-4 gap-y-16'>
      {initialData.docs.map((item) => (
        <SiteCard key={item.id} item={item} />
      ))}
    </section>
  )
}
export default SiteCards

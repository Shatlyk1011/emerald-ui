import { FC } from 'react';
import SiteCard from './SiteCard';
import { IWebsites } from '@/types/inspiration';

interface Props {
  initialData: IWebsites
};

const SiteCards:FC<Props> = ({ initialData }) => {
  return (
    <section className='grid gap-x-6 gap-y-6 grid-cols-3'>
      {initialData.docs.map((item) => (
        <SiteCard key={item.id} item={item} />
      ))}
    </section>
  )
};
export default SiteCards
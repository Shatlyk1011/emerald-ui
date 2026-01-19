import { FC } from 'react';
import SiteCard from './SiteCard';
import { IWebsites } from '@/types/inspiration';

interface Props {
  initialData: IWebsites
};

const SiteCards:FC<Props> = ({ initialData }) => {
  return (
    <div className='grid gap-x-3 gap-y-6 grid-cols-3'>
      {initialData.docs.map((item, i) => (
        <div key={i} >
          <SiteCard item={item} />
        </div>
      ))}
    </div>
  )
};
export default SiteCards
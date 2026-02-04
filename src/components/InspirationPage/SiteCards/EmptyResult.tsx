import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  handleResetFilters: () => void
};

const EmptyResult: FC<Props> = ({ handleResetFilters }) => {
  return (
    <div className='flex flex-col items-center justify-center py-24'>
      <h3 className='text-2xl font-semibold mb-2'>No websites found</h3>
      <p className='text-muted-foreground max-w-md mb-3'>
        Couldn&apos;t find any websites matching your filters.
      </p>
      <Button className='text-sm' variant='outline' size='default' onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </div>
  )
};
export default EmptyResult
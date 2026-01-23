import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  handleResetFilters: () => void
};

const EmptyResult:FC<Props> = ({handleResetFilters}) => {
  return (
    <div className='flex flex-col items-center justify-center py-24 gap-6'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <h3 className='text-2xl font-semibold'>No websites found</h3>
        <p className='text-muted-foreground max-w-md'>
          We couldn&apos;t find any websites matching your filters. Try adjusting your search criteria or reset the filters.
        </p>
      </div>
      <Button onClick={handleResetFilters} variant='outline' size='lg'>
        Reset Filters
      </Button>
    </div>
  )
};
export default EmptyResult
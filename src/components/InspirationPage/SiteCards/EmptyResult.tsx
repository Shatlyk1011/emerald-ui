import { FC } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  handleResetFilters: () => void
}

const EmptyResult: FC<Props> = ({ handleResetFilters }) => {
  return (
    <div className='flex flex-col items-center justify-center py-24'>
      <h3 className='mb-2 text-2xl font-semibold'>No websites found</h3>
      <p className='text-muted-foreground mb-3 max-w-md'>
        Couldn&apos;t find any websites matching your filters.
      </p>
      <Button
        className='text-sm'
        variant='outline'
        size='default'
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  )
}
export default EmptyResult

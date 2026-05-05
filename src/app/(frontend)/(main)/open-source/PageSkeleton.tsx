
export default function OpenSourcePageSkeleton() {
  return (
    <div className='flex animate-pulse flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <div className='bg-muted h-10 w-64 rounded-md' />
        <div className='bg-muted h-6 w-96 rounded-md' />
      </div>

      <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='flex flex-col gap-3'>
            <div className='bg-muted h-4 w-24 rounded-md' />
            <div className='flex flex-wrap gap-2'>
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className='bg-muted h-6 w-16 rounded-md' />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='bg-muted h-64 rounded-xl' />
        ))}
      </div>
    </div>
  )
}
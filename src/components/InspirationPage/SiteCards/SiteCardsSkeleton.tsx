import SiteCardSkeleton from './SiteCardSkeleton'

export default function SiteCardsSkeleton() {
  return (
    <section className='grid grid-cols-3 gap-x-4 gap-y-16 max-xl:grid-cols-2 max-sm:grid-cols-1'>
      {Array.from({ length: 6 }).map((_, index) => (
        <SiteCardSkeleton key={index} />
      ))}
    </section>
  )
}

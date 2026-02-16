import { Briefcase, MapPin, DollarSign, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface JobDetailsCardProps {
  logo?: React.ReactNode
  company?: string
  location?: string
  title?: string
  type?: string
  salary?: string
  experience?: string
  skills?: string[]
  applicants?: number
  postedAt?: string
  submit?: () => void
}

export default function JobDetailsCard({
  logo,
  company = 'Design Systems Inc.',
  location = 'New York, NY',
  title = 'Lead Product Designer',
  type = 'Full-time',
  salary = '$140k - $180k',
  experience = '7+ years Design experience',
  skills = ['Figma mastery', 'Prototyping skills'],
  applicants = 124,
  postedAt = '3 days ago',
  submit,
}: JobDetailsCardProps) {
  return (
    <div className='group relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900'>
      <div className='p-5'>
        <div className='flex items-center gap-4'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-600 text-xl font-semibold text-white dark:bg-zinc-800'>
            {logo || 'D'}
          </div>
          <div>
            <h4 className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
              {company}
            </h4>
            <div className='mt-1 flex items-center gap-2'>
              <MapPin className='h-3.5 w-3.5 text-zinc-400' />
              <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                {location}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <h3 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100'>
            {title}
          </h3>
          <div className='mt-4 flex items-center gap-4'>
            <div className='flex items-center gap-1.5'>
              <Briefcase className='h-4 w-4 text-zinc-400' />
              <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                {type}
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <DollarSign className='h-4 w-4 text-zinc-400' />
              <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                {salary}
              </span>
            </div>
          </div>
          <div className='mt-4 space-y-2'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary h-1.5 w-1.5 rounded-full' />
              <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                {experience}
              </span>
            </div>
            {skills.map((skill, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='bg-primary h-1.5 w-1.5 rounded-full' />
                <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form
        onSubmit={submit}
        className='mt-2 flex items-center justify-between border-t border-zinc-200 px-5 py-4 dark:border-zinc-800'
      >
        <div className='flex flex-col gap-1 text-sm text-zinc-500 dark:text-zinc-400'>
          <div>
            <span className='font-medium text-zinc-900 dark:text-zinc-100'>
              {applicants}
            </span>{' '}
            applicants
          </div>
          <div>Posted {postedAt}</div>
        </div>
        <Button type='submit'>
          <span className='flex items-center gap-2'>
            Apply Now
            <ArrowUpRight className='h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5' />
          </span>
        </Button>
      </form>
    </div>
  )
}

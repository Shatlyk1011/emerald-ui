'use client'

/**
 * @author: @nodeui
 * @description: A modern job listing card with company info, position details, requirements, and application stats
 * @version: 1.0.0
 * @date: 2026-02-06
 * @license: MIT
 * @website: https://nodeui.com
 */
import { motion } from 'motion/react'
import { MapPin, Briefcase, DollarSign, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface JobRequirement {
  text: string
}

interface JobListingCardProps {
  companyName?: string
  companyInitial?: string
  companyColor?: string
  location?: string
  position?: string
  employmentType?: string
  salaryRange?: string
  requirements?: JobRequirement[]
  applicantCount?: number
  postedDaysAgo?: number
  onApply?: () => void
  className?: string
}

export default function JobListingCard({
  companyName = 'TechVision Inc',
  companyInitial = 'T',
  companyColor = 'bg-purple-500',
  location = 'New York, NY',
  position = 'Senior Full-Stack Engineer',
  employmentType = 'Full-time',
  salaryRange = '$130k - $170k',
  requirements = [
    { text: '6+ years full-stack experience' },
    { text: 'Node.js & React mastery' },
    { text: 'System design expertise' },
  ],
  applicantCount = 92,
  postedDaysAgo = 3,
  onApply,
  className,
}: JobListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'group relative overflow-hidden w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      <div className="p-5">
        {/* Company Header */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-semibold shrink-0',
              companyColor
            )}
          >
            {companyInitial}
          </motion.div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {companyName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{location}</p>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {position}
          </h3>

          {/* Job Meta */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {employmentType}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {salaryRange}
              </span>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-4 space-y-2">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className={cn('w-1.5 h-1.5 rounded-full', companyColor)} />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {req.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between mt-2">
        <div className="text-sm text-zinc-500 dark:text-zinc-400 flex flex-col gap-1">
          <div>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {applicantCount}
            </span>
            <span className="font-medium text-zinc-500 dark:text-zinc-400">
              {' '}
              applicants
            </span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">
              Posted {postedDaysAgo} days ago
            </span>
          </div>
        </div>

        <Button
          onClick={onApply}
          className="group/btn relative flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 h-9 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          <span className="flex items-center gap-2">
            Apply Now
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </span>
        </Button>
      </div>
    </motion.div>
  )
}

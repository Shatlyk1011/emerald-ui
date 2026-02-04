'use client'

/**
 * @author: @nodeui
 * @description: Interactive Data Table with micro-interactions, animated sorting, and expandable rows
 * @version: 1.0.0
 * @date: 2026-02-03
 * @license: MIT
 * @website: https://nodeui.com
 */
import { useState, useMemo, Fragment } from 'react'
import { ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Types
export interface UserRecord {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  date: string
  details: {
    phone: string
    address: string
    bio: string
  }
}

type SortDirection = 'asc' | 'desc' | null
type SortableColumn = 'name' | 'email' | 'status' | 'date'

interface SortConfig {
  column: SortableColumn | null
  direction: SortDirection
}

export interface InteractiveDataTableProps {
  data?: UserRecord[]
  className?: string
}

// Default Data

const defaultData: UserRecord[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    status: 'active',
    date: '2024-01-15',
    details: {
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      bio: 'Senior software engineer with 10+ years of experience in full-stack development.',
    },
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    status: 'inactive',
    date: '2024-02-20',
    details: {
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      bio: 'Product manager specializing in SaaS platforms and user experience design.',
    },
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol.w@example.com',
    status: 'pending',
    date: '2024-03-10',
    details: {
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, Chicago, IL 60601',
      bio: 'UX/UI designer with a passion for creating beautiful and intuitive interfaces.',
    },
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@example.com',
    status: 'active',
    date: '2024-01-25',
    details: {
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Houston, TX 77001',
      bio: 'DevOps engineer focused on cloud infrastructure and automation.',
    },
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    status: 'active',
    date: '2024-02-05',
    details: {
      phone: '+1 (555) 567-8901',
      address: '654 Maple Dr, Phoenix, AZ 85001',
      bio: 'Data scientist with expertise in machine learning and predictive analytics.',
    },
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.m@example.com',
    status: 'inactive',
    date: '2024-03-15',
    details: {
      phone: '+1 (555) 678-9012',
      address: '987 Cedar Ln, Philadelphia, PA 19101',
      bio: 'Marketing specialist with a focus on digital campaigns and content strategy.',
    },
  },
  {
    id: '7',
    name: 'Grace Wilson',
    email: 'grace.wilson@example.com',
    status: 'pending',
    date: '2024-01-30',
    details: {
      phone: '+1 (555) 789-0123',
      address: '147 Birch Ct, San Antonio, TX 78201',
      bio: 'Business analyst helping companies optimize their operations and workflows.',
    },
  },
  {
    id: '8',
    name: 'Henry Moore',
    email: 'henry.moore@example.com',
    status: 'active',
    date: '2024-02-12',
    details: {
      phone: '+1 (555) 890-1234',
      address: '258 Spruce Way, San Diego, CA 92101',
      bio: 'Full-stack developer specializing in React and Node.js applications.',
    },
  },
  {
    id: '9',
    name: 'Iris Taylor',
    email: 'iris.taylor@example.com',
    status: 'active',
    date: '2024-03-01',
    details: {
      phone: '+1 (555) 901-2345',
      address: '369 Willow Blvd, Dallas, TX 75201',
      bio: 'Cybersecurity expert protecting organizations from digital threats.',
    },
  },
  {
    id: '10',
    name: 'Jack Anderson',
    email: 'jack.anderson@example.com',
    status: 'inactive',
    date: '2024-01-18',
    details: {
      phone: '+1 (555) 012-3456',
      address: '741 Ash Pl, San Jose, CA 95101',
      bio: 'Sales director with a proven track record in B2B enterprise solutions.',
    },
  },
]

// Status Badge Component

const StatusBadge = ({ status }: { status: UserRecord['status'] }) => {
  const variants = {
    active:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    pending:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[status]
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// Main Component

export default function InteractiveDataTable({
  data = defaultData,
  className,
}: InteractiveDataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: null,
  })
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.column || !sortConfig.direction) {
      return data
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.column!]
      const bValue = b[sortConfig.column!]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  // Handle column sort
  const handleSort = (column: SortableColumn) => {
    setSortConfig((prev) => {
      if (prev.column === column) {
        // Cycle through: asc -> desc -> null
        if (prev.direction === 'asc') {
          return { column, direction: 'desc' }
        } else if (prev.direction === 'desc') {
          return { column: null, direction: null }
        }
      }
      return { column, direction: 'asc' }
    })
  }

  // Toggle row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  // Get sort icon
  const getSortIcon = (column: SortableColumn) => {
    if (sortConfig.column !== column) {
      return <ArrowUpDown className='ml-1 h-4 w-4 opacity-40' />
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className='ml-1 h-4 w-4 text-cyan-500' />
    }
    return <ArrowDown className='ml-1 h-4 w-4 text-cyan-500' />
  }

  console.log('sortedData', sortedData)

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Header Section */}
      <div className='space-y-1 text-center'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
          Team Members Directory
        </h2>
        <p className='text-gray-600 dark:text-gray-400'>
          Manage and view detailed information about your team members. <br />{' '}
          Click on any row to expand bio.
        </p>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-50 hover:bg-gray-50 dark:bg-gray-900/50 dark:hover:bg-gray-900/50'>
              <TableHead className='w-12'></TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className='flex items-center font-semibold text-gray-900 transition-colors hover:text-cyan-600 dark:text-gray-100 dark:hover:text-cyan-400'
                >
                  Name
                  {getSortIcon('name')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('email')}
                  className='flex items-center font-semibold text-gray-900 transition-colors hover:text-cyan-600 dark:text-gray-100 dark:hover:text-cyan-400'
                >
                  Email
                  {getSortIcon('email')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('status')}
                  className='flex items-center font-semibold text-gray-900 transition-colors hover:text-cyan-600 dark:text-gray-100 dark:hover:text-cyan-400'
                >
                  Status
                  {getSortIcon('status')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('date')}
                  className='flex items-center font-semibold text-gray-900 transition-colors hover:text-cyan-600 dark:text-gray-100 dark:hover:text-cyan-400'
                >
                  Date
                  {getSortIcon('date')}
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode='popLayout'>
              {sortedData.map((record) => {
                const isExpanded = expandedRows.has(record.id)

                return (
                  <Fragment key={record.id}>
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        layout: { duration: 0.2, ease: 'easeInOut' },
                        opacity: { duration: 0.2 },
                      }}
                      className='border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/30'
                    >
                      <TableCell>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => toggleRowExpansion(record.id)}
                          className='h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-800'
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className='h-4 w-4' />
                          </motion.div>
                        </Button>
                      </TableCell>
                      <TableCell className='font-medium text-gray-900 dark:text-gray-100'>
                        {record.name}
                      </TableCell>
                      <TableCell className='text-gray-600 dark:text-gray-400'>
                        {record.email}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={record.status} />
                      </TableCell>
                      <TableCell className='text-gray-600 dark:text-gray-400'>
                        {new Date(record.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                    </motion.tr>

                    {/* Expanded Row Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className='border-b border-gray-200 dark:border-gray-800'
                        >
                          <TableCell colSpan={6} className='p-0'>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className='overflow-hidden bg-gray-50 dark:bg-gray-900/30'
                            >
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                                className='space-y-4 p-6'
                              >
                                <h4 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                                  Detailed Information
                                </h4>
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                  <div>
                                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                      Phone
                                    </p>
                                    <p className='mt-1 text-gray-900 dark:text-gray-100'>
                                      {record.details.phone}
                                    </p>
                                  </div>
                                  <div>
                                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                      Address
                                    </p>
                                    <p className='mt-1 text-gray-900 dark:text-gray-100'>
                                      {record.details.address}
                                    </p>
                                  </div>
                                  <div className='md:col-span-2'>
                                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                      Bio
                                    </p>
                                    <p className='mt-1 text-gray-900 dark:text-gray-100'>
                                      {record.details.bio}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                )
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

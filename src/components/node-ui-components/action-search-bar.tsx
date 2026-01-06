'use client'

/**
 * @author: @nodeui
 * @description: A modern search bar component with action buttons and suggestions
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://nodeui.com
 */
import { useState, useCallback } from 'react'
import {
  Search,
  Send,
  BarChart2,
  Video,
  PlaneTakeoff,
  AudioLines,
  LayoutGrid,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  short?: string
  end?: string
}

interface SearchResult {
  actions: Action[]
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  },
} as const

const allActionsSample = [
  {
    id: '1',
    label: 'Book tickets',
    icon: <PlaneTakeoff className='h-4 w-4 text-blue-500' />,
    description: 'Operator',
    short: '⌘K',
    end: 'Agent',
  },
  {
    id: '2',
    label: 'Summarize',
    icon: <BarChart2 className='h-4 w-4 text-orange-500' />,
    description: 'gpt-5',
    short: '⌘cmd+p',
    end: 'Command',
  },
  {
    id: '3',
    label: 'Screen Studio',
    icon: <Video className='h-4 w-4 text-purple-500' />,
    description: 'Claude 4.1',
    short: '',
    end: 'Application',
  },
  {
    id: '4',
    label: 'Talk to Jarvis',
    icon: <AudioLines className='h-4 w-4 text-green-500' />,
    description: 'gpt-5 voice',
    short: '',
    end: 'Active',
  },
  {
    id: '5',
    label: 'Node UI - Pro',
    icon: <LayoutGrid className='h-4 w-4 text-blue-500' />,
    description: 'Components',
    short: '',
    end: 'Link',
  },
]

function ActionSearchBar({
  actions = allActionsSample,
  defaultOpen = false,
}: {
  actions?: Action[]
  defaultOpen?: boolean
}) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(defaultOpen)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      setIsTyping(true)
      setActiveIndex(-1)
    },
    []
  )

  const handleActionClick = useCallback((action: Action) => {
    setSelectedAction(action)
  }, [])

  const handleFocus = useCallback(() => {
    setSelectedAction(null)
    setIsFocused(true)
    setActiveIndex(-1)
  }, [])

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false)
      setActiveIndex(-1)
    }, 200)
  }, [])

  return (
    <div className='mx-auto w-full max-w-xl'>
      <div className='relative flex min-h-[300px] flex-col items-center justify-start'>
        <div className='bg-background sticky top-0 z-10 w-full max-w-sm pt-4 pb-1'>
          <label
            className='mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400'
            htmlFor='search'
          >
            Search Commands
          </label>
          <div className='relative'>
            <span>input</span>
            <div className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2'>
              <AnimatePresence mode='popLayout'>
                {query.length > 0 ? (
                  <motion.div
                    key='send'
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className='h-4 w-4 text-gray-400 dark:text-gray-500' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='search'
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className='h-4 w-4 text-gray-400 dark:text-gray-500' />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className='w-full max-w-sm'>
          <AnimatePresence>
            {isFocused && result && !selectedAction && (
              <motion.div
                className='mt-1 w-full overflow-hidden rounded-md border bg-white shadow-xs dark:border-gray-800 dark:bg-black'
                variants={ANIMATION_VARIANTS.container}
                role='listbox'
                aria-label='Search results'
                initial='hidden'
                animate='show'
                exit='exit'
              >
                <motion.ul role='none'>
                  {result.actions.map((action) => (
                    <motion.li
                      key={action.id}
                      id={`action-${action.id}`}
                      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-200 dark:hover:bg-zinc-900 ${
                        activeIndex === result.actions.indexOf(action)
                          ? 'bg-gray-100 dark:bg-zinc-800'
                          : ''
                      }`}
                      variants={ANIMATION_VARIANTS.item}
                      layout
                      onClick={() => handleActionClick(action)}
                      role='option'
                      aria-selected={
                        activeIndex === result.actions.indexOf(action)
                      }
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <span className='text-gray-500' aria-hidden='true'>
                            {action.icon}
                          </span>
                          <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {action.label}
                          </span>
                          {action.description && (
                            <span className='text-xs text-gray-400'>
                              {action.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        {action.short && (
                          <span
                            className='text-xs text-gray-400'
                            aria-label={`Keyboard shortcut: ${action.short}`}
                          >
                            {action.short}
                          </span>
                        )}
                        {action.end && (
                          <span className='text-right text-xs text-gray-400'>
                            {action.end}
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className='mt-2 border-t border-gray-100 px-3 py-2 dark:border-gray-800'>
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>Press ⌘K to open commands</span>
                    <span>ESC to cancel</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ActionSearchBar

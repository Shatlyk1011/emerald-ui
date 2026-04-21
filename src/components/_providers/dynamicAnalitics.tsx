'use client'

import dynamic from 'next/dynamic'

const Analytics = dynamic(() => import('./analytics').then(m => m.Analytics), {
  ssr: false,
})

export default Analytics
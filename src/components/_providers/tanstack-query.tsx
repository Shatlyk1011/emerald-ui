'use client'
import { FC, ReactNode, useState } from 'react'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const QueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 72, // 72 hours
      // fix it IT TO 30 MIN
      staleTime: 0, // 30 minutes (immediate revalidation)
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error: Error) => {
        /** we can use toast or notification here */
        console.error(error.message)
      },
    },
  },
}

interface Props {
  children: ReactNode
}

const TanstackQueryProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(QueryConfig))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default TanstackQueryProvider

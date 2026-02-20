'use client'
import { FC, ReactNode, useState } from 'react'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'

export const QueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 72, // 72 hours
      // UPDATE IT TO 30 MIN
      staleTime: 0, // 0 minutes (immediate revalidation)
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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
export default TanstackQueryProvider

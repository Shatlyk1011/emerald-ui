'use client'
import { FC, ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryClientConfig } from '@tanstack/react-query'

export const QueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
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

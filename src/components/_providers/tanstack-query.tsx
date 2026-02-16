'use client'
import { FC, ReactNode, useState } from 'react'
import { QueryClient, QueryClientConfig } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { get, set, del } from 'idb-keyval'

// Custom persister that only saves the first page of infinite queries
const persister = createAsyncStoragePersister({
  storage: {
    getItem: get,
    setItem: set,
    removeItem: del,
  },
  // Custom serialize function to trim infinite queries to first page only
  serialize: (data) => {
    // Deep clone to avoid mutating the original cache
    const clonedData = JSON.parse(JSON.stringify(data))
    console.log('clonedData', clonedData)
    // Process each query in the client state
    if (clonedData.clientState?.queries) {
      clonedData.clientState.queries = clonedData.clientState.queries.map(
        (query: {
          state?: {
            data?: {
              pages?: unknown[]
              pageParams?: unknown[]
            }
          }
          [key: string]: unknown
        }) => {
          // Check if this is an infinite query (has pages array)
          if (
            query.state?.data?.pages &&
            Array.isArray(query.state.data.pages)
          ) {
            // Only persist the first page
            return {
              ...query,
              state: {
                ...query.state,
                data: {
                  pages: [query.state.data.pages[0]], // Keep only first page
                  pageParams: [query.state.data.pageParams?.[0]], // Keep only first pageParam
                },
              },
            }
          }
          // Return non-infinite queries unchanged
          return query
        }
      )
    }

    return JSON.stringify(clonedData)
  },
})

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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
export default TanstackQueryProvider

'use client'
import { FC, ReactNode, useState } from 'react'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { get, set, del } from 'idb-keyval'

const persister = createAsyncStoragePersister({
  storage: {
    getItem: get,
    setItem: set,
    removeItem: del,
  },
})

export const QueryConfig = {
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

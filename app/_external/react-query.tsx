'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export { QueryClientProvider, client }

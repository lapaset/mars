import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import SimpleReactLightbox from 'simple-react-lightbox'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    },
  },
})

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </QueryClientProvider>,
  document.getElementById('root')
)

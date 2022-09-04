import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import RootRouter from './components/router/RootRouter'

const queryClient = new QueryClient()

const App: FC = () => {
  // Provide the client to your App
  return (
    <QueryClientProvider client={queryClient}>
      <RootRouter />
    </QueryClientProvider>
  )
}

export default App

import { render, screen } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes, MemoryRouter } from 'react-router-dom'
import PageNotFound from '.'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})

function setup() {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>,
  )
}

describe('Not Found Page', () => {
  it('should render page ', async () => {
    const { container } = setup()
    await screen.findByText('page not found')

    expect(container).toMatchSnapshot()
  })
})

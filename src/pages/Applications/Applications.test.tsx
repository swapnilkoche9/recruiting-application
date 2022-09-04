import { fireEvent, render, screen, within } from '@testing-library/react'

import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes, MemoryRouter } from 'react-router-dom'

import Applications from '.'
import { ApplicationsScenarios, baseHandlers, handlerForScenario } from './mocks/applicationsMock'

const server = setupServer(...baseHandlers())

beforeAll(() => {
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => {
  server.close()
})

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
          <Route path='/' element={<Applications />} />
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>,
  )
}

describe('Applications Page', () => {
  describe('Error flow', () => {
    it('should show error message  ', async () => {
      server.use(handlerForScenario[ApplicationsScenarios.ERROR]())
      setup()
      await screen.findByText('Error Occured! Please try again')
    })
  })
  describe('happy flow', () => {
    it('should render page ', async () => {
      const { container } = setup()
      await screen.findByText('Applications')

      expect(container).toMatchSnapshot()
    })

    it('should render all the applications ', async () => {
      setup()
      const applicationsList = await screen.findAllByTestId('table-row')

      expect(applicationsList.length).toBe(2)
    })

    it('sort ascending  ', async () => {
      setup()
      const ascArrowYoe = await screen.findByTestId('year_of_experience-asc')
      const ascArrowPa = await screen.findByTestId('position_applied-asc')
      const ascArrowAd = await screen.findByTestId('application_date-asc')
      fireEvent.click(ascArrowYoe)
      const applicationsList = await screen.findAllByTestId('table-row')
      within(applicationsList[0]).getByText('Alvin Satterfield')
      within(applicationsList[1]).getByText('Colette Morar')

      fireEvent.click(ascArrowPa)
      const applicationsList1 = await screen.findAllByTestId('table-row')
      within(applicationsList1[0]).getByText('Alvin Satterfield')
      within(applicationsList1[1]).getByText('Colette Morar')

      fireEvent.click(ascArrowAd)
      const applicationsList2 = await screen.findAllByTestId('table-row')
      within(applicationsList2[0]).getByText('Alvin Satterfield')
      within(applicationsList2[1]).getByText('Colette Morar')
    })

    it('sort descending  ', async () => {
      setup()
      const desArrowYoe = await screen.findByTestId('year_of_experience-des')
      const desArrowPa = await screen.findByTestId('position_applied-des')
      const desArrowAd = await screen.findByTestId('application_date-des')
      fireEvent.click(desArrowYoe)
      const applicationsList = await screen.findAllByTestId('table-row')
      within(applicationsList[1]).getByText('Colette Morar')
      within(applicationsList[0]).getByText('Alvin Satterfield')

      fireEvent.click(desArrowPa)
      const applicationsList1 = await screen.findAllByTestId('table-row')
      within(applicationsList1[1]).getByText('Colette Morar')
      within(applicationsList1[0]).getByText('Alvin Satterfield')

      fireEvent.click(desArrowAd)
      const applicationsList2 = await screen.findAllByTestId('table-row')
      within(applicationsList2[1]).getByText('Colette Morar')
      within(applicationsList2[0]).getByText('Alvin Satterfield')
    })
  })
})

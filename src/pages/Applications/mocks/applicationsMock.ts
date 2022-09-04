import { rest } from 'msw'
import applicationsMock from './applications.json'

export enum ApplicationsScenarios {
  ERROR = 'ERROR',
}

export const baseHandlers = () => [
  rest.get('http://personio-fe-test.herokuapp.com/api/v1/candidates', (req, res, ctx) => {
    return res(ctx.json(applicationsMock))
  }),
]

export const handlerForScenario = {
  [ApplicationsScenarios.ERROR]: () =>
    rest.get('http://personio-fe-test.herokuapp.com/api/v1/candidates', (req, res, ctx) => {
      return res(ctx.json({ error: { code: 500, message: 'Fatal error :(' } }))
    }),
}

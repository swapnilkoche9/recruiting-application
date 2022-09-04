import { sortAndFilterApplications, SortKeysEnum, SortTypeEnum } from './util'
import mockApplication from '../mocks/applications.json'
import { IApplication } from '../../../dtos/applications'

describe('util test', () => {
  it('sortAndFilterApplications by year_of_experience', () => {
    const applications = sortAndFilterApplications(
      mockApplication['data'] as IApplication[],
      '',
      SortKeysEnum.year_of_experience,
      SortTypeEnum.ascending,
    )

    expect(applications).toEqual([mockApplication['data'][1], mockApplication['data'][0]])
  })

  it('sortAndFilterApplications by application_date', () => {
    const applications = sortAndFilterApplications(
      mockApplication['data'] as IApplication[],
      '',
      SortKeysEnum.application_date,
      SortTypeEnum.ascending,
    )

    expect(applications).toEqual([mockApplication['data'][1], mockApplication['data'][0]])
  })

  it('sortAndFilterApplications by position_applied', () => {
    const applications = sortAndFilterApplications(
      mockApplication['data'] as IApplication[],
      '',
      SortKeysEnum.position_applied,
      SortTypeEnum.ascending,
    )

    expect(applications).toEqual([mockApplication['data'][1], mockApplication['data'][0]])
  })

  it('sortAndFilterApplications by position_applied and search value', () => {
    const applications = sortAndFilterApplications(
      mockApplication['data'] as IApplication[],
      'Cole',
      SortKeysEnum.position_applied,
      SortTypeEnum.ascending,
    )

    expect(applications).toEqual([mockApplication['data'][1]])
  })
})

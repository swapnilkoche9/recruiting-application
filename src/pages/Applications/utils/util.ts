import { SortTypes } from '..'
import { IApplication } from '../../../dtos/applications'

const params = new URLSearchParams()

export enum SortKeysEnum {
  year_of_experience = 'year_of_experience',
  application_date = 'application_date',
  position_applied = 'position_applied',
}

export enum SortTypeEnum {
  ascending = 'ascending',
  descending = 'descending',
}

export const sortAndFilterApplications = (
  applications: IApplication[],
  searchValue: string,
  sortKey: keyof IApplication | undefined,
  sortType: SortTypes,
) => {
  if (applications.length === 0) return []
  let applicationsData = [...applications]

  if (searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase()

    applicationsData = applications.filter(
      (application) =>
        application.name.toLowerCase().includes(lowerCaseSearchValue) ||
        application.status.toLowerCase().includes(lowerCaseSearchValue) ||
        application.position_applied.toLowerCase().includes(lowerCaseSearchValue),
    )
  }

  if (!sortKey) return applicationsData

  if (sortKey === SortKeysEnum.year_of_experience) {
    return applicationsData.sort((app1: IApplication, app2: IApplication) => {
      if (sortType === SortTypeEnum.ascending) return app1[sortKey] - app2[sortKey]

      return app2[sortKey] - app1[sortKey]
    })
  }

  if (sortKey === SortKeysEnum.application_date) {
    return applicationsData.sort((app1: IApplication, app2: IApplication) => {
      const date1 = new Date(app1[sortKey])
      const date2 = new Date(app2[sortKey])

      if (sortType === SortTypeEnum.ascending) return date1.getTime() - date2.getTime()

      return date2.getTime() - date1.getTime()
    })
  }

  if (sortKey === SortKeysEnum.position_applied) {
    return applicationsData.sort((app1: IApplication, app2: IApplication) => {
      const position1 = app1[sortKey].toUpperCase() // ignore upper and lowercase
      const position2 = app2[sortKey].toUpperCase()
      if (sortType === SortTypeEnum.ascending) {
        if (position1 < position2) return -1
        if (position1 > position2) return 1
        return 0
      }

      if (position2 < position1) return -1
      if (position2 > position1) return 1
      return 0
    })
  }
}

export const formattedHashValues = (hash: string) => {
  const result: { [key: string]: string } = {}
  if (!hash) return {}
  const hashEntries = decodeURIComponent(hash).split('?')[1].split('&')
  hashEntries.forEach((item) => {
    const [key, value] = item.split('=')
    result[key] = value
  })
  return result
}

export const formattedRowData = (application: IApplication) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = application
  return { ...rest }
}

export const setUrlParams = (key: string, value: string) => {
  params.set(key, value)
  window.location.hash = `?${params.toString()}`
}

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import { applicationsAdaptor } from '../../adapters/applicationsAdapter'
import Table from '../../components/Table'
import TableRow from '../../components/Table/Row'
import {
  formattedHashValues,
  formattedRowData,
  setUrlParams,
  sortAndFilterApplications,
} from './utils/util'
import { Column, IApplication } from '../../dtos/applications'
import InfoBox from '../../components/InfoBox'
import InputBox from '../../components/InputBox'
import TableHeader from '../../components/Table/Header'

import './applications.scss'

const columns: Column[] = [
  { name: 'Name', canBeSorted: false, key: 'name' },
  { name: 'Email', canBeSorted: false, key: 'email' },
  { name: 'Age', canBeSorted: false, key: 'birth_date' },
  { name: 'Years of experience', canBeSorted: true, key: 'year_of_experience' },
  { name: 'Position applied', canBeSorted: true, key: 'position_applied' },
  { name: 'Applied', canBeSorted: true, key: 'application_date' },
  { name: 'Status', canBeSorted: false, key: 'status' },
]

export type SortTypes = 'ascending' | 'descending'
export type SortKeys = keyof IApplication

interface ApplicationResponse {
  data?: IApplication[]
  error?: { code: number; message: string }
}

const Applications: FC = () => {
  const [sortValue, setSortValue] = useState<SortKeys>()
  const [searchValue, setSearchValue] = useState('')
  const sortType = useRef<SortTypes>('ascending')

  const { hash } = useLocation()

  const {
    data = { data: [] },
    isLoading,
    isError,
  } = useQuery<ApplicationResponse>('application', applicationsAdaptor)

  const { data: applications = [], error = null } = data
  const errorOccured = !!error || isError

  const {
    sortKey = '',
    activeSort = '',
    searchKey = '',
  } = useMemo(() => formattedHashValues(hash), [hash])

  const formattedSearchKey = useMemo(() => searchKey.split('+').join(' '), [searchKey])

  const filteredApplications = useMemo(
    () =>
      sortAndFilterApplications(
        applications,
        formattedSearchKey ?? searchValue,
        (sortKey as keyof IApplication) ?? sortValue,
        (activeSort as SortTypes) ?? sortType.current,
      ) ?? [],
    [applications, formattedSearchKey, searchValue, sortKey, sortValue, activeSort],
  )

  const showApplications = !errorOccured && !isLoading && filteredApplications.length > 0

  const noResult = filteredApplications.length === 0 && !errorOccured && !isLoading

  useEffect(() => {
    activeSort && setUrlParams('activeSort', activeSort)
    sortKey && setUrlParams('sortKey', sortKey)
    if (searchKey) {
      setUrlParams('searchKey', searchKey)
    }
  }, [activeSort, searchKey, sortKey])

  const sortTable = useCallback((sortKey: keyof IApplication, type: SortTypes) => {
    setUrlParams('activeSort', type)
    setUrlParams('sortKey', sortKey)

    sortType.current = type
    setSortValue(sortKey)
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setUrlParams('searchKey', value)
    setSearchValue(value)
  }, [])

  return (
    <div className='container'>
      <h2 className='applications_header'>Applications</h2>
      <div className='input-wrapper'>
        <InputBox
          placeholder='search here'
          onValueChange={handleInputChange}
          disabled={isLoading}
          value={searchValue || formattedSearchKey}
        />
      </div>
      <Table
        tableHeader={
          <TableHeader columns={columns} disabled={isLoading || errorOccured} onSort={sortTable} />
        }
      >
        {showApplications &&
          filteredApplications.map((application: IApplication) => (
            <TableRow key={application.id} rowData={formattedRowData(application)} />
          ))}
      </Table>

      <div className='info-wrapper'>
        {noResult && <InfoBox message='No Results Found' />}
        {errorOccured && <InfoBox message='Error Occured! Please try again' variant='error' />}
        {isLoading && <InfoBox message='Data is being loaded ...' />}
      </div>
    </div>
  )
}

export default Applications

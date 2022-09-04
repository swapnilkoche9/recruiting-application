import { FC } from 'react'

import { Column, IApplication } from '../../../dtos/applications'
import DownArrow from '../../../material/icons/DownArrow'
import UpArrow from '../../../material/icons/UpArrow'
import { SortTypes } from '../../../pages/Applications'
import { SortTypeEnum } from '../../../pages/Applications/utils/util'

import './header.scss'

interface ITableHeaderProps {
  columns: Column[]
  disabled: boolean
  onSort: (sortKey: keyof IApplication, sortType: SortTypes) => void
}

const TableHeader: FC<ITableHeaderProps> = ({ columns, disabled, onSort }) => {
  return (
    <tr>
      {columns.map(({ name, canBeSorted, key }) => (
        <th key={name}>
          {name}
          {canBeSorted && (
            <span className='arrow-wrapper'>
              <button
                onClick={() => onSort(key, SortTypeEnum.ascending)}
                disabled={disabled}
                data-testid={key + '-asc'}
              >
                <UpArrow height={'15px'} width={'15px'} />
              </button>
              <button
                onClick={() => onSort(key, SortTypeEnum.descending)}
                disabled={disabled}
                data-testid={key + '-des'}
              >
                <DownArrow height={'15px'} width={'15px'} />
              </button>
            </span>
          )}
        </th>
      ))}
    </tr>
  )
}

export default TableHeader

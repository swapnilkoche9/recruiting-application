import { CSSProperties, FC, ReactNode } from 'react'

import { Column, IApplication } from '../../dtos/applications'
import { SortTypes } from '../../pages/Applications'
import TableHeader from './Header'
import './table.scss'

interface ITableProps {
  columns: Column[]
  headerStyle?: CSSProperties
  tableStyle?: CSSProperties
  bodyStyle?: CSSProperties
  children: ReactNode
  disabled: boolean
  onSort: (sortKey: keyof IApplication, sortType: SortTypes) => void
}

const Table: FC<ITableProps> = ({
  columns,
  headerStyle = {},
  tableStyle = {},
  bodyStyle = {},
  children,
  disabled,
  onSort,
}) => {
  return (
    <table className='table-container' style={{ ...tableStyle }}>
      <thead className='table-header' style={{ ...headerStyle }}>
        <TableHeader columns={columns} disabled={disabled} onSort={onSort} />
      </thead>

      <tbody className='table-body' style={{ ...bodyStyle }}>
        {children}
      </tbody>
    </table>
  )
}

export default Table

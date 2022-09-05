import { CSSProperties, FC, ReactNode } from 'react'

import './table.scss'

interface ITableProps {
  headerStyle?: CSSProperties
  tableStyle?: CSSProperties
  bodyStyle?: CSSProperties
  children: ReactNode
  tableHeader: ReactNode
}

const Table: FC<ITableProps> = ({
  headerStyle = {},
  tableStyle = {},
  bodyStyle = {},
  children,
  tableHeader,
}) => {
  return (
    <table className='table-container' style={{ ...tableStyle }}>
      <thead className='table-header' style={{ ...headerStyle }}>
        {tableHeader}
      </thead>
      <tbody className='table-body' style={{ ...bodyStyle }}>
        {children}
      </tbody>
    </table>
  )
}

export default Table

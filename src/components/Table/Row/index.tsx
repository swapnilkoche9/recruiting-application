import { IApplication } from '../../../dtos/applications'

const TableRow = ({ rowData }: { rowData: IApplication }) => {
  return (
    <tr data-testid='table-row'>
      {Object.entries(rowData).map(([key, value]) => (
        <td key={key}>{value}</td>
      ))}
    </tr>
  )
}

export default TableRow

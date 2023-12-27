import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  Table,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { IWeatherWeekData } from '../../types/table'
import { map } from 'lodash'

const table = (prop: IWeatherWeekData[]) => {
  const columnHelper = createColumnHelper<IWeatherWeekData>()
  let tableData: Table<IWeatherWeekData> | undefined
  const columns = useMemo(() => {
    if (prop) {
      return Object.keys(prop).map((date) => {
        return columnHelper.accessor((row) => row[date], {
          header: date,
          cell: (info) => info.getValue(),
        })
      })
    }
    return []
  }, [columnHelper, prop])

  if (prop && prop?.length > 0) {
    tableData = useReactTable({
      data: prop,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
  }

  return (
    <>
      <h3>title</h3>
      {tableData && (
        <table>
          <thead>
            {map(tableData.getHeaderGroups(), (headerGroup) => (
              <tr key={headerGroup.id}>
                {map(headerGroup.headers, (column) => (
                  <th key={column.id}>
                    {column.isPlaceholder
                      ? null
                      : flexRender(
                          column.column.columnDef.header,
                          column.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {map(tableData.getRowModel().rows, (row) => (
              <tr key={row.id}>
                {map(row.getVisibleCells(), (cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default table

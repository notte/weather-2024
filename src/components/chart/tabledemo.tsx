import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CityWeek } from '../../types/response/weather-week'
import * as type from '../../types/table'
import { useEffect, useState } from 'react'
import { getWeatherWeek } from '../../utils/helpers'

const table = (prop: any) => {
  const columnHelper = createColumnHelper<type.ICityWeekTable>()
  const [data, setData] = useState<type.ICityWeekData>()

  const columns = [
    columnHelper.accessor('PoP12h', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('T', {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('AT', {
      header: () => 'Age',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('Wx', {
      header: () => <span>Visits</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('UVI', {
      header: 'Status',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('WeatherDescription', {
      header: 'Profile Progress',
      footer: (info) => info.column.id,
    }),
  ]

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })

  useEffect(() => {
    const data = getWeatherWeek(prop)
    setData(() => data)
  }, [JSON.stringify(data)])

  useEffect(() => {
    console.log(data)
  }, [JSON.stringify(data)])

  return (
    <>
      {/* <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </>
  )
}

export default table

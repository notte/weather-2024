import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Column,
} from '@tanstack/react-table'
import * as type from '../../types/table'
import { useEffect, useState, useMemo } from 'react'
import { getWeatherWeek } from '../../utils/helpers'
import { map } from 'lodash'

const table = (prop: any) => {
  const columnHelper = createColumnHelper()
  const [data, setData] = useState<type.IWeekItem[]>()

  useEffect(() => {
    setData(() => getWeatherWeek(prop))
  }, [prop])

  useEffect(() => {
    if (data && data?.length > 0) {
      const columns: any = useMemo(() => {
        return map(data, (key) => {
          console.log(key)
          return {
            Header: key,
            accessor: key,
          }
        })
      }, [JSON.stringify(data)])

      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })
    }
  }, [JSON.stringify(data)])

  return <></>
}

export default table

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Column,
} from '@tanstack/react-table'
import * as type from '../../types/table'
import { useEffect, useState, useMemo } from 'react'
import { getWeatherWeekData } from '../../utils/helpers'
import { CityWeek } from '../../types/response/weather-week'
import { map } from 'lodash'

const table = (prop: CityWeek) => {
  const columnHelper = createColumnHelper()
  const [data, setData] = useState<type.IWeekItem[]>()

  useEffect(() => {
    getWeatherWeekData(prop)
    // setData(() => getWeatherWeekData(prop))
  }, [JSON.stringify(prop)])

  useEffect(() => {
    if (data && data?.length > 0) {
      // const columns: any = useMemo(() => {
      //   return map(data, (key) => {
      //     console.log(key)
      //     return {
      //       Header: key,
      //       accessor: key,
      //     }
      //   })
      // }, [JSON.stringify(data)])
      // const table = useReactTable({
      //   data,
      //   columns,
      //   getCoreRowModel: getCoreRowModel(),
      // })
    }
  }, [data])

  return <></>
}

export default table

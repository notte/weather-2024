import { useState, useEffect } from 'react'
import { IWeatherWeekData, ITemperature } from '../../types/table'
import { map } from 'lodash'
import { getTemperature } from '../../utils/helpers'

const table = (prop: { weekData: IWeatherWeekData[] }) => {
  const [T, setT] = useState<ITemperature>()
  const [AT, setAT] = useState<ITemperature>()
  const [time, setTime] = useState<string[]>()
  const [Wx, setWx] = useState()
  const [UVI, setUVI] = useState()

  useEffect(() => {
    if (prop.weekData) {
      const [MaxAT, Wx, MinT, UVI, MinAT, MaxT] = prop.weekData
      setT(() => getTemperature(MinT, MaxT))
      setAT(() => getTemperature(MinAT, MaxAT))
      setTime(() => map(Object.keys(UVI.UVI), (item) => item))
    }
  }, [JSON.stringify(prop)])

  useEffect(() => {
    console.log(time)
  }, [T, AT, time])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            {time &&
              map(time, (header: string) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>溫度</td>
            {time &&
              map(T, (column: string, index: number) => (
                <td key={column[0] + index}>{column[0]}</td>
              ))}
          </tr>
          <tr>
            <td>體感溫度</td>
            {time &&
              map(T, (column: string, index: number) => (
                <td key={column[1] + index}>{column[1]}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default table

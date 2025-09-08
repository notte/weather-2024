import { useState, useEffect } from 'react'
import { IWorkData } from '../../types/table'
import { map, keys } from 'lodash'
import { getColspan, getWeatherIcon } from '../../utils/helpers'

const townTable = (prop: { townData: IWorkData[] }) => {
  const [T, setT] = useState<{ [key: string]: string | string[] }>()
  const [AT, setAT] = useState<{ [key: string]: string | string[] }>()
  const [day, setDay] = useState<string[]>()
  const [allDay, setAllDay] = useState<string[]>()
  const [Wx, setWx] = useState<{ [key: string]: string | string[] }>()
  const [CI, setCI] = useState<{ [key: string]: string | string[] }>()
  const [PoP6h, setPoP6h] = useState<{}>()

  useEffect(() => {
    if (prop.townData) {
      const [Wx, AT, T, CI, PoP6h] = prop.townData

      setDay(() =>
        Array.from(new Set(map(keys(T.T), (item: any) => item.substring(0, 10))))
      )
      setAllDay(() => map(keys(T.T), (item) => item))
      setT(() => T.T)
      setAT(() => AT.AT)
      setWx(() => Wx.Wx)
      setCI(() => CI.CI)
      setPoP6h(() => PoP6h.PoP6h)
    }
  }, [prop])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            {day &&
              allDay &&
              map(day, (header: string) => (
                <th key={header} colSpan={getColspan(header, allDay)}>
                  {header}
                </th>
              ))}
          </tr>
          <tr>
            <th>時間</th>
            {allDay &&
              map(allDay, (header: string) => (
                <th key={header}>{header.substring(11, 16)}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>天氣</td>
            {Wx &&
              map(Wx, (column: string, index: number) => (
                <td key={column[1] + index}>
                  <div
                    className={`${getWeatherIcon(column)} weather-table-icon`}
                  ></div>
                  <p>{column}</p>
                </td>
              ))}
          </tr>
          <tr>
            <td>溫度</td>
            {T &&
              map(T, (column: string, index: number) => (
                <td key={column[1] + index}>{column}°C</td>
              ))}
          </tr>
          <tr>
            <td>體感溫度</td>
            {AT &&
              map(AT, (column: string, index: number) => (
                <td key={column[1] + index}>{column}°C</td>
              ))}
          </tr>
          <tr>
            <td>舒適度</td>
            {CI &&
              map(CI, (column: string, index: number) => (
                <td key={column[1] + index}>{column}</td>
              ))}
          </tr>
          <tr>
            <td>降雨機率</td>
            {PoP6h &&
              map(PoP6h, (column: string, index: number) => (
                <td colSpan={2} key={column[1] + index}>
                  {column}%
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default townTable

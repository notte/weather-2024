import { useState, useEffect } from 'react'
import { IWeatherWeekData, ITemperature, IWx } from '../../types/table'
import { map, keys } from 'lodash'
import {
  getTemperature,
  geWx,
  getWeatherIcon,
  getUVIClass,
} from '../../utils/helpers'

const table = (prop: { weekData: IWeatherWeekData[] }) => {
  const [T, setT] = useState<ITemperature>()
  const [AT, setAT] = useState<ITemperature>()
  const [time, setTime] = useState<string[]>()
  const [Wx, setWx] = useState<IWx>()
  const [UVI, setUVI] = useState<{}>()

  useEffect(() => {
    if (prop.weekData) {
      const [MaxAT, Wx, MinT, UVI, MinAT, MaxT] = prop.weekData

      setT(() => getTemperature(MinT, MaxT))
      setAT(() => getTemperature(MinAT, MaxAT))
      setTime(() => map(keys(UVI.UVI), (item) => item.substring(0, 10)))
      setWx(() => geWx(Wx.Wx as Object))
      setUVI(() => UVI.UVI)
    }
  }, [JSON.stringify(prop)])

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
            <td>白天</td>
            {T &&
              Wx &&
              map(T, (column: { [key: string]: string }, index: number) => (
                <td key={column[0] + index}>
                  <div
                    className={`${getWeatherIcon(
                      Wx[index].day
                    )} weather-table-icon`}
                  >
                    <p className="hover">{Wx[index].day}</p>
                  </div>
                  <p>{column.day}</p>
                </td>
              ))}
          </tr>
          <tr>
            <td>晚上</td>
            {T &&
              Wx &&
              map(T, (column: { [key: string]: string }, index: number) => (
                <td key={column[1] + index}>
                  <div
                    className={`${getWeatherIcon(
                      Wx[index].night
                    )} weather-table-icon`}
                  >
                    <p className="hover">{Wx[index].night}</p>
                  </div>

                  <p>{column.night}</p>
                </td>
              ))}
          </tr>
          <tr>
            <td>白天體感</td>
            {AT &&
              map(AT, (column: { [key: string]: string }, index: number) => (
                <td key={column[1] + index}>{column.day}</td>
              ))}
          </tr>
          <tr>
            <td>晚上體感</td>
            {AT &&
              map(AT, (column: { [key: string]: string }, index: number) => (
                <td key={column[1] + index}>{column.night}</td>
              ))}
          </tr>
          <tr>
            <td>紫外線</td>
            {UVI &&
              map(UVI, (column: string, index: number) => (
                <td key={column[1] + index}>
                  <span className={`${getUVIClass(column)} uvi`}>{column}</span>
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default table

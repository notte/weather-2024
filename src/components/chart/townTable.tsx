import { useState, useEffect } from 'react'
import { IWorkData } from '../../types/table'
import { map, keys } from 'lodash'

const townTable = (prop: { townData: IWorkData[] }) => {
  const [T, setT] = useState<any>()
  const [AT, setAT] = useState<any>()
  const [day, setDay] = useState<string[]>()
  const [time, setTime] = useState<string[]>()
  const [Wx, setWx] = useState<any>()
  const [CI, setCI] = useState<{}>()
  const [PoP6h, setPoP6h] = useState<{}>()
  useEffect(() => {
    if (prop.townData) {
      const [Wx, AT, T, CI, PoP6h] = prop.townData

      setDay(() =>
        Array.from(new Set(map(keys(T.T), (item) => item.substring(0, 10))))
      )
    }
  }, [prop])

  useEffect(() => {
    console.log(time)
  }, [Wx, AT, T, CI, PoP6h, time, day])
  return (
    <>
      <table>
        <thead>
          {/* <tr>
            <th>日期</th>
            {time &&
              map(time, (header: string) => <th key={header}>{header}</th>)}
          </tr> */}
        </thead>
        <tbody>
          {/* <tr>
            <td>紫外線</td>
            {UVI &&
              map(UVI, (column: string, index: number) => (
                <td key={column[1] + index}>
                  <span className={`${getUVIClass(column)} uvi`}>{column}</span>
                </td>
              ))}
          </tr> */}
        </tbody>
      </table>
    </>
  )
}

export default townTable

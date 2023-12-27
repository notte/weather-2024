import { useEffect } from 'react'
import { IWeatherWeekData } from '../../types/table'
import { map } from 'lodash'

const table = (prop: { weekData: IWeatherWeekData[] }) => {
  let keys
  useEffect(() => {
    if (prop.weekData.length > 0) {
      keys = Object.keys(prop.weekData[0])
      // console.log(prop.weekData)
      map(prop.weekData, (item) => {
        // console.log(item[keys[0]])
      })
    }
  }, [JSON.stringify(prop.weekData)])
  return (
    <>
      {prop.weekData && prop.weekData.length > 0 && (
        <table>
          <thead>
            <tr>
              {keys &&
                map(keys, (header: string) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
        </table>
      )}
    </>
  )
}

export default table

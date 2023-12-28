import { useEffect } from 'react'
import { IWeatherWeekData } from '../../types/table'
import { map } from 'lodash'

const table = (prop: { weekData: IWeatherWeekData[] }) => {
  let keys
  useEffect(() => {
    console.log(prop.weekData)
  }, [JSON.stringify(prop)])
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

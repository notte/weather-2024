import { IWeatherWeekData } from '../../types/table'

const table = (prop: IWeatherWeekData[]) => {
  return (
    <>
      {prop && (
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      )}
    </>
  )
}

export default table

import { Line } from 'react-chartjs-2'
import * as type from '../../types/common'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const line = (props: type.ILineProps) => {
  return (
    <>
      {props && props.labels.length > 0 && (
        <Line
          options={{
            responsive: true,
            plugins: {},
          }}
          data={props}
        />
      )}
    </>
  )
}

export default line

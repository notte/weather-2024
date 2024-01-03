import { Line } from 'react-chartjs-2'
import * as type from '../../types/common'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip)

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

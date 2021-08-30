import './index.css'
import {Line} from 'react-chartjs-2'

const Charts = props => {
  const {monthsData, dataSet, type, label} = props

  let background
  let border

  switch (true) {
    case type === 'confirmed-ch':
      background = '#331427'
      border = '#FF073A'
      break
    case type === 'active-ch':
      background = '#132240'
      border = '#007BFF'
      break
    case type === 'recovered-ch':
      background = '#182829'
      border = '#28A745'
      break
    case type === 'deceased-ch':
      background = '#212230'
      border = '#6C757D'
      break
    case type === 'tested-ch':
      background = '#230f41'
      border = '#9673B9'
      break
    case type === 'vaccine-ch':
      background = '#2e1e30'
      border = '#F95581'
      break
    case type === 'test-positive-ch':
      background = '#332323'
      border = '#FD7E14'
      break
    default:
      break
  }

  const data = {
    labels: monthsData,
    datasets: [
      {
        label: `${label}`,
        data: dataSet,
        fill: true,
        backgroundColor: background,
        borderColor: border,
      },
    ],
  }
  return <Line className={type} data={data} />
}

export default Charts

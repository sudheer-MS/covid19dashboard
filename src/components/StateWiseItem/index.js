import './index.css'
import {Link} from 'react-router-dom'

const StateWiseItem = props => {
  const {data} = props
  const {stateName, stateData, stateInfo} = data
  const {state} = stateInfo
  const {total, meta} = stateData
  const {confirmed, recovered, deceased} = total
  const {population} = meta

  return (
    <Link className="state-item-link" to={`/state/${state.state_code}`}>
      <li className="table-row h">
        <div className="table-cell first-cell">
          <p className="paragraph">{stateName}</p>
        </div>
        <div className="table-cell">
          <p className="paragraph confirmedp">{confirmed}</p>
        </div>
        <div className="table-cell">
          <p className="paragraph activep">
            {confirmed - recovered - deceased}
          </p>
        </div>
        <div className="table-cell">
          <p className="paragraph recoveredp">{recovered}</p>
        </div>
        <div className="table-cell">
          <p className="paragraph deceasedp">{deceased}</p>
        </div>
        <div className="table-cell last-cell population">
          <p className="paragraph populationp">{population}</p>
        </div>
      </li>
    </Link>
  )
}

export default StateWiseItem

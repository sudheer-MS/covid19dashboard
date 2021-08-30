import './index.css'
import {Link} from 'react-router-dom'

const SearchItem = props => {
  const {searchInput} = props
  const data = {
    stateName: searchInput.state_name,
    stateCode: searchInput.state_code,
  }

  return (
    <Link className="search-item-link" to={`/state/${data.stateCode}`}>
      <div className="search-item">
        <p className="search-text">{data.stateName}</p>
        <div className="search-code">
          <p className="state-code-text">{data.stateCode}</p>
          <i className="far fa-caret-square-right code-icon"> </i>
        </div>
      </div>
    </Link>
  )
}

export default SearchItem

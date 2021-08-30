import {Component} from 'react'
import './index.css'
import SearchItem from '../SearchItem'

class Search extends Component {
  state = {search: '', displaySearch: false}

  onChangeSearch = event => {
    this.setState({search: event.target.value, displaySearch: true})
    if (event.target.value === '') {
      this.setState({displaySearch: false})
    }
  }

  renderInput = () => {
    const {search} = this.state
    return (
      <div className="search-input-and-results-container">
        <i className="fas fa-search search-icon"> </i>
        <div className="search-input-container">
          <input
            className="input-search"
            placeholder="Enter the State"
            value={search}
            name="Google-Search"
            type="search"
            onChange={this.onChangeSearch}
          />
        </div>
      </div>
    )
  }

  renderSearchResults = () => {
    const {statesList} = this.props
    const {search} = this.state

    return (
      <>
        {statesList
          .filter(state =>
            state.state_name.toLowerCase().includes(search.toLowerCase()),
          )
          .map(state => (
            <SearchItem key={state.state_code} searchInput={state} />
          ))}
      </>
    )
  }

  render() {
    const {displaySearch} = this.state
    return (
      <>
        {this.renderInput()}
        {displaySearch && this.renderSearchResults()}
      </>
    )
  }
}

export default Search

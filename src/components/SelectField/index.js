import {Component} from 'react'
import Select from 'react-select'

class SelectField extends Component {
  render() {
    const {selected, options, onChange} = this.props

    return <Select value={selected} onChange={onChange} options={options} />
  }
}

export default SelectField

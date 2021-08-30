import {Component} from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'
import StatsItem from '../StatsItem'
import StateWiseItem from '../StateWiseItem'
import SelectField from '../SelectField'
import Search from '../Search'
import Charts from '../Charts'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const selectOptions = statesList.map(state => ({
  value: state.state_code,
  label: state.state_name,
}))

const dateOptions = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}

class Home extends Component {
  state = {
    statistics: [],
    isLoading: true,
    stateWiseData: {},
    selectedState: {value: 'AN', label: 'Andaman and Nicobar Islands'},
    spreadTrendsData: '',
  }

  componentDidMount() {
    this.getStatsData()
    this.getTrendsData()
  }

  getTrendsData = async () => {
    this.setState({isLoading: true})
    const url = 'https://data.covid19india.org/v4/min/timeseries.min.json'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const trendsData = await response.json()
    this.setState({isLoading: false, spreadTrendsData: trendsData})
  }

  getStatsData = async () => {
    const url = 'https://data.covid19india.org/v4/min/data.min.json'
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    const statsData = await response.json()
    const totalConfirmed = Object.values(statsData).reduce(
      (p, {total}) => p + total.confirmed,
      0,
    )
    const totalRecovered = Object.values(statsData).reduce(
      (p, {total}) => p + total.recovered,
      0,
    )
    const totalDeceased = Object.values(statsData).reduce(
      (p, {total}) => p + total.deceased,
      0,
    )
    const totalActive = totalConfirmed - (totalRecovered + totalDeceased)
    this.setState({
      statistics: [
        {id: 1, confirmed: totalConfirmed},
        {id: 2, active: totalActive},
        {id: 3, recovered: totalRecovered},
        {id: 4, deceased: totalDeceased},
      ],
      isLoading: false,
      stateWiseData: statsData,
    })
  }

  renderSearch = () => <Search statesList={statesList} />

  handleChange = value => {
    this.setState({
      selectedState: value,
    })
  }

  renderSelectState = () => {
    const {selectedState} = this.state
    return (
      <div className="select-state">
        <SelectField
          options={selectOptions}
          onChange={this.handleChange}
          selected={selectedState}
        />
      </div>
    )
  }

  renderStateTrendChart = () => {
    const {spreadTrendsData, selectedState} = this.state
    const {value, label} = selectedState
    const stateTrendData = spreadTrendsData[value]

    const stateTrendValues = Object.values(stateTrendData.dates)

    const dataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (date.delta.confirmed === undefined) {
        return 0
      }
      return date.delta.confirmed
    })

    const monthsData = Object.keys(stateTrendData.dates).map(
      month =>
        `${month.slice(0, 4)}-${dateOptions[month.slice(5, 7)]}-${month.slice(
          8,
          10,
        )}`,
    )

    return (
      <Charts
        label={label}
        type="confirmed-ch"
        stateTrendData={stateTrendData}
        dataSet={dataSet}
        monthsData={monthsData}
      />
    )
  }

  renderTotalStats = () => {
    const {statistics, stateWiseData, spreadTrendsData} = this.state
    return (
      <>
        <ul className="stats-list-items">
          {statistics.map(stat => (
            <StatsItem key={stat.id} data={stat} />
          ))}
        </ul>
        <div className="table-row-data">
          <div className="table-cell first-cell">
            <p className="paragraph">States/UT</p>
          </div>
          <div className="table-cell">
            <p className="paragraph">Confirmed</p>
          </div>
          <div className="table-cell">
            <p className="paragraph">Active</p>
          </div>
          <div className="table-cell">
            <p className="paragraph">Recovered</p>
          </div>
          <div className="table-cell">
            <p className="paragraph">Deceased</p>
          </div>
          <div className="table-cell last-cell population">
            <p className="paragraph">Population</p>
          </div>
        </div>
        <ul className="state-wise-list-items">
          {statesList.map(state => (
            <StateWiseItem
              key={state.state_code}
              data={{
                stateName: state.state_name,
                stateData: stateWiseData[state.state_code],
                stateInfo: {state},
              }}
            />
          ))}
        </ul>
        <h1 className="about-heading">Spread Trends</h1>
        <p className="fact">
          *Select state below to view day wise confirmed data
        </p>
        {this.renderSelectState()}
        {spreadTrendsData !== '' && this.renderStateTrendChart()}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        <div className="home-bg">
          {this.renderSearch()}
          {isLoading ? (
            <Loader
              className="loader-spinner"
              type="TailSpin"
              color="#007BFF"
              height={50}
              width={50}
            />
          ) : (
            this.renderTotalStats()
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import StatsItem from '../StatsItem'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Charts from '../Charts'

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

const statesList = {
  AN: 'Andaman and Nicobar Islands',
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CH: 'Chandigarh',
  CT: 'Chhattisgarh',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  GJ: 'Gujarat',
  GA: 'Goa',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JK: 'Jammu and Kashmir',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  MH: 'Maharashtra',
  MP: 'Madhya Pradesh',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PY: 'Puducherry',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UP: 'Uttar Pradesh',
  UT: 'Uttarakhand',
  WB: 'West Bengal',
}

class StateData extends Component {
  state = {
    stateStats: [
      {id: 1, confirmed: 0},
      {id: 2, active: 0},
      {id: 3, recovered: 0},
      {id: 4, deceased: 0},
    ],
    stateData: {},
    lastUpdated: '',
    totalTested: 0,
    isLoading: true,
    spreadTrendsData: '',
    chartData: 'daily',
  }

  componentDidMount() {
    this.getStatsData()
    this.getTrendsData()
  }

  onClickDaily = () => {
    this.setState({chartData: 'daily'})
  }

  onClickCumulative = () => {
    this.setState({chartData: 'cumulative'})
  }

  getStatsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = 'https://data.covid19india.org/v4/min/data.min.json'
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    const statsData = await response.json()
    const stateData = statsData[id]

    const totalConfirmed = stateData.total.confirmed
    const totalRecovered = stateData.total.recovered
    const totalDeceased = stateData.total.deceased
    const totalActive = totalConfirmed - (totalRecovered + totalDeceased)
    const lastUpdatedDate = stateData.meta.last_updated
    const totalTested = stateData.total.tested

    this.setState({
      stateStats: [
        {id: 1, confirmed: totalConfirmed},
        {id: 2, active: totalActive},
        {id: 3, recovered: totalRecovered},
        {id: 4, deceased: totalDeceased},
      ],
      stateData,
      totalTested,
      lastUpdated: lastUpdatedDate,
      isLoading: false,
    })
  }

  getTrendsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({isLoading: true})
    const url = `https://data.covid19india.org/v4/min/timeseries-${id}.min.json`
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const trendsData = await response.json()
    const stateTrendsData = trendsData[id]
    this.setState({isLoading: false, spreadTrendsData: stateTrendsData})
  }

  renderStateTrendChart = () => {
    const {spreadTrendsData, chartData} = this.state
    const stateTrendValues = Object.values(spreadTrendsData.dates)

    // Daily confirmed data
    const dailyConfirmedDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (date.delta.confirmed === undefined) {
        return 0
      }
      return date.delta.confirmed
    })
    // Daily active data
    const dailyActiveDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      let confirmed
      let recovered
      let deceased
      if (date.delta.confirmed === undefined) {
        confirmed = 0
      } else {
        confirmed = date.delta.confirmed
      }
      if (date.delta.recovered === undefined) {
        recovered = 0
      } else {
        recovered = date.delta.recovered
      }
      if (date.delta.deceased === undefined) {
        deceased = 0
      } else {
        deceased = date.delta.deceased
      }
      const active = confirmed - recovered - deceased
      if (active < 0) {
        return 0
      }
      return active
    })
    // Daily recovered data
    const dailyRecoveredDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (date.delta.recovered === undefined) {
        return 0
      }
      return date.delta.recovered
    })
    // Daily deceased data
    const dailyDeceasedDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (date.delta.deceased === undefined) {
        return 0
      }
      if (date.delta.deceased < 0) {
        return 0
      }
      return date.delta.deceased
    })
    // Daily tested data
    const dailyTestedDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (date.delta.tested === undefined) {
        return 0
      }
      if (date.delta.tested < 0) {
        return 0
      }
      return date.delta.tested
    })
    // Daily vaccinated data
    const dailyVaccinatedDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (
        date.delta.vaccinated2 === undefined ||
        date.delta.vaccinated1 === undefined
      ) {
        return 0
      }
      if (date.delta.vaccinated1 + date.delta.vaccinated2 < 0) {
        return 0
      }
      return date.delta.vaccinated1 + date.delta.vaccinated2
    })
    // Daily test positivity data
    const dailyTestPositivityDataSet = stateTrendValues.map(date => {
      if (date.delta === undefined) {
        return 0
      }
      if (
        date.delta.confirmed === undefined ||
        date.delta.tested === undefined
      ) {
        return 0
      }
      const percentage = (date.delta.confirmed * 100) / date.delta.tested
      if (parseFloat(percentage.toFixed(2)) < 0) {
        return 0
      }
      return parseFloat(percentage.toFixed(2))
    })

    // Cumulative confirmed data
    const cumulativeConfirmedDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      if (date.total.confirmed === undefined) {
        return 0
      }
      return date.total.confirmed
    })
    // Cumulative active data
    const cumulativeActiveDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      let confirmed
      let recovered
      let deceased
      if (date.total.confirmed === undefined) {
        confirmed = 0
      } else {
        confirmed = date.total.confirmed
      }
      if (date.total.recovered === undefined) {
        recovered = 0
      } else {
        recovered = date.total.recovered
      }
      if (date.total.deceased === undefined) {
        deceased = 0
      } else {
        deceased = date.total.deceased
      }
      const active = confirmed - recovered - deceased
      if (active < 0) {
        return 0
      }
      return active
    })
    // Cumulative recovered data
    const cumulativeRecoveredDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      if (date.total.recovered === undefined) {
        return 0
      }
      return date.total.recovered
    })
    // Cumulative deceased data
    const cumulativeDeceasedDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      if (date.total.deceased === undefined) {
        return 0
      }
      if (date.total.deceased < 0) {
        return 0
      }
      return date.total.deceased
    })
    // Cumulative tested data
    const cumulativeTestedDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      if (date.total.tested === undefined) {
        return 0
      }
      if (date.total.tested < 0) {
        return 0
      }
      return date.total.tested
    })
    // Cumulative vaccinated data
    const cumulativeVaccinatedDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      if (
        date.total.vaccinated2 === undefined ||
        date.total.vaccinated1 === undefined
      ) {
        return 0
      }
      if (date.total.vaccinated1 + date.total.vaccinated2 < 0) {
        return 0
      }
      return date.total.vaccinated1 + date.total.vaccinated2
    })
    // Cumulative test positivity data
    const cumulativeTestPositivityDataSet = stateTrendValues.map(date => {
      if (date.total === undefined) {
        return 0
      }
      if (
        date.total.confirmed === undefined ||
        date.total.tested === undefined
      ) {
        return 0
      }
      const percentage = (date.total.confirmed * 100) / date.total.tested
      if (parseFloat(percentage.toFixed(2)) < 0) {
        return 0
      }
      return parseFloat(percentage.toFixed(2))
    })

    const monthsData = Object.keys(spreadTrendsData.dates).map(
      month =>
        `${month.slice(0, 4)}-${dateOptions[month.slice(5, 7)]}-${month.slice(
          8,
          10,
        )}`,
    )

    const confirmedDataSet =
      chartData === 'daily' ? dailyConfirmedDataSet : cumulativeConfirmedDataSet
    const activeDataSet =
      chartData === 'daily' ? dailyActiveDataSet : cumulativeActiveDataSet
    const recoveredDataSet =
      chartData === 'daily' ? dailyRecoveredDataSet : cumulativeRecoveredDataSet
    const deceasedDataSet =
      chartData === 'daily' ? dailyDeceasedDataSet : cumulativeDeceasedDataSet
    const testedDataSet =
      chartData === 'daily' ? dailyTestedDataSet : cumulativeTestedDataSet
    const vaccinatedDataSet =
      chartData === 'daily'
        ? dailyVaccinatedDataSet
        : cumulativeVaccinatedDataSet
    const testPositivityDataSet =
      chartData === 'daily'
        ? dailyTestPositivityDataSet
        : cumulativeTestPositivityDataSet

    return (
      <>
        <Charts
          label="Confirmed"
          type="confirmed-ch"
          dataSet={confirmedDataSet}
          monthsData={monthsData}
        />
        <Charts
          label="Active"
          type="active-ch"
          dataSet={activeDataSet}
          monthsData={monthsData}
        />
        <Charts
          label="Recovered"
          type="recovered-ch"
          dataSet={recoveredDataSet}
          monthsData={monthsData}
        />
        <Charts
          label="Deceased"
          type="deceased-ch"
          dataSet={deceasedDataSet}
          monthsData={monthsData}
        />
        <Charts
          label="Tested"
          type="tested-ch"
          dataSet={testedDataSet}
          monthsData={monthsData}
        />
        <Charts
          label="Vaccinated"
          type="vaccine-ch"
          dataSet={vaccinatedDataSet}
          monthsData={monthsData}
        />
        <Charts
          label="Test Positivity Ratio in %"
          type="test-positive-ch"
          dataSet={testPositivityDataSet}
          monthsData={monthsData}
        />
      </>
    )
  }

  renderDistricts = () => {
    const {stateData} = this.state
    const districtsData = Object.entries(stateData.districts)
    const districtsDataRandom = districtsData.map(district => {
      if (district[0] === 'Foreign Evacuees' || district[0] === 'Other State') {
        return [district[0], 0]
      }
      if (district[1].delta21_14 === undefined) {
        return [district[0], 0]
      }
      if (district[1].delta21_14.confirmed < 0) {
        return [district[0], 0]
      }
      return [district[0], district[1].delta21_14.confirmed]
    })

    const topDistrictsData = districtsDataRandom.sort((a, b) => b[1] - a[1])
    const topDistricts = topDistrictsData.map(dist => {
      if (dist[1] === 0) {
        return [dist[0], '* N/A']
      }
      return dist
    })

    return (
      <div>
        <h1 className="districts-heading">Top Districts</h1>
        <ul className="districts-list">
          {topDistricts.map(dist => (
            <li key={dist[0]} className="top-districts-item">
              <p className="mar">{dist[1]}</p>
              <p className="mar-1">{dist[0]}</p>
            </li>
          ))}
        </ul>
        <p className="info-">
          * Data either Not Available or Zero for selected districts
        </p>
      </div>
    )
  }

  renderHeader = () => {
    const {
      stateStats,
      lastUpdated,
      totalTested,
      spreadTrendsData,
      chartData,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const cumulativeClass =
      chartData === 'cumulative' ? 'trends-button-s' : 'trends-button'
    const dailyClass =
      chartData === 'daily' ? 'trends-button-s' : 'trends-button'

    return (
      <div className="state-data-bg">
        <div className="state-header">
          <div>
            <h1 className="state-name-heading">{statesList[id]}</h1>
            <p className="updated-date">{`Last updated on ${
              dateOptions[lastUpdated.slice(5, 7)]
            } ${lastUpdated.slice(8, 10)} ${lastUpdated.slice(0, 4)}.`}</p>
          </div>
          <div>
            <p className="tested-text">Tested</p>
            <p className="tested-text">{totalTested}</p>
          </div>
        </div>
        <ul className="stats-list-items">
          {stateStats.map(stat => (
            <StatsItem key={stat.id} data={stat} />
          ))}
        </ul>
        {this.renderDistricts()}
        <h1 className="about-heading">Spread Trends</h1>
        <div>
          <button
            onClick={this.onClickCumulative}
            className={cumulativeClass}
            type="button"
          >
            Cumulative
          </button>
          <button
            onClick={this.onClickDaily}
            className={dailyClass}
            type="button"
          >
            Daily
          </button>
        </div>
        {spreadTrendsData !== '' && this.renderStateTrendChart()}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Navbar />
        {isLoading ? (
          <Loader
            className="loader-spinner"
            type="TailSpin"
            color="#007BFF"
            height={50}
            width={50}
          />
        ) : (
          this.renderHeader()
        )}

        <Footer />
      </>
    )
  }
}

export default StateData

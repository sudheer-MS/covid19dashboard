import './index.css'

const StatsItem = props => {
  const {data} = props
  let statType
  let number
  let iconClass
  let itemClass
  switch (true) {
    case data.confirmed !== undefined:
      statType = 'Confirmed'
      number = data.confirmed
      iconClass = 'far fa-check-circle statIcon'
      itemClass = 'confirmed'
      break
    case data.recovered !== undefined:
      statType = 'Recovered'
      number = data.recovered
      iconClass = 'fas fa-user-shield statIcon'
      itemClass = 'recovered'
      break
    case data.deceased !== undefined:
      statType = 'Deceased'
      number = data.deceased
      iconClass = 'fas fa-head-side-virus statIcon'
      itemClass = 'deceased'
      break
    case data.active !== undefined:
      statType = 'Active'
      number = data.active
      iconClass = 'fas fa-clipboard-check statIcon'
      itemClass = 'active'
      break
    default:
      break
  }

  return (
    <li className={itemClass}>
      <p>{statType}</p>
      <i className={iconClass}> </i>
      <p>{number}</p>
    </li>
  )
}

export default StatsItem

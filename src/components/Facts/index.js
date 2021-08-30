import './index.css'

const Facts = props => {
  const {fact} = props
  const {banner} = fact

  return (
    <li className="fact-list-item">
      <p className="fact">{banner}</p>
    </li>
  )
}

export default Facts

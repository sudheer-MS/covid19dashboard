import './index.css'

const Faq = props => {
  const {faqs} = props
  const {question, answer} = faqs

  return (
    <li className="faq-list-item">
      <p className="question">{question}</p>
      <p className="answer">
        <span className="faq-list-item">Ans: </span>
        {answer}
      </p>
    </li>
  )
}

export default Faq

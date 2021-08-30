import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Faq from '../Faq'
import Facts from '../Facts'
import Footer from '../Footer'

class About extends Component {
  state = {isLoading: true, aboutData: []}

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    const url = 'https://data.covid19india.org/website_data.json'
    const options = {method: 'GET'}
    const aboutResponse = await fetch(url, options)
    const aboutData = await aboutResponse.json()
    this.setState({isLoading: false, aboutData})
  }

  renderAbout = () => {
    const {aboutData} = this.state
    const {factoids, faq} = aboutData

    return (
      <div className="about-bg">
        <h1 className="about-heading">About</h1>
        <h1 className="about-heading">Frequently Asked Questions</h1>
        <ul className="faq-list">
          {faq.map(eachFaq => (
            <Faq faqs={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <h1 className="about-heading">Facts About Covid</h1>
        <ul className="faq-list">
          {factoids.map(eachFact => (
            <Facts fact={eachFact} key={eachFact.id} />
          ))}
        </ul>
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
          this.renderAbout()
        )}
        <Footer />
      </>
    )
  }
}

export default About

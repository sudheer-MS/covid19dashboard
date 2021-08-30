import './index.css'

const Footer = () => (
  <div className="footer-bg">
    <p className="logo-text">
      COVID19<span className="logo-inner-text">INDIA</span>
    </p>
    <p className="footer-text">
      we stand with everyone fighting on the front lines
    </p>
    <div>
      <a
        href="https://github.com/covid19india"
        rel="noreferrer"
        target="_blank"
      >
        <i className="fab fa-github icon"> </i>
      </a>
      <a
        href="https://www.instagram.com/covid19indiaorg/"
        rel="noreferrer"
        target="_blank"
      >
        <i className="fab fa-instagram icon"> </i>
      </a>
      <a
        href="https://twitter.com/covid19indiaorg"
        rel="noreferrer"
        target="_blank"
      >
        <i className="fab fa-twitter icon"> </i>
      </a>
    </div>
  </div>
)

export default Footer

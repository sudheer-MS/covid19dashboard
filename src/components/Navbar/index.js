import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Navbar extends Component {
  state = {display: false}

  onClickMenu = () => {
    this.setState(prev => ({
      display: !prev.display,
    }))
  }

  render() {
    const {display} = this.state

    return (
      <div>
        <div className="navbar-bg">
          <Link to="/" className="router-link">
            <p className="logo-text">
              COVID19<span className="logo-inner-text">INDIA</span>
            </p>
          </Link>
          <ul className="navbar-link-list">
            <Link to="/" className="router-link">
              <li className="navbar-link">Home</li>
            </Link>
            <Link to="/about" className="router-link">
              <li>About</li>
            </Link>
          </ul>
          <button
            type="button"
            onClick={this.onClickMenu}
            className="menu-icon"
          >
            {display ? (
              <i className="fas fa-times"> </i>
            ) : (
              <i className="fas fa-bars"> </i>
            )}
          </button>
        </div>
        {display && (
          <ul className="navbar-link-list-mobile">
            <Link to="/" className="router-link">
              <li className="navbar-link">Home</li>
            </Link>
            <Link to="/about" className="router-link">
              <li>About</li>
            </Link>
          </ul>
        )}
      </div>
    )
  }
}

export default Navbar

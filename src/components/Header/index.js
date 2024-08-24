import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="header-home-link">
        <img
          src="https://raw.githubusercontent.com/rajmanish23/nxt-assess/master/src/assets/header-logo.png"
          alt="website logo"
          className="header-logo-img"
        />
      </Link>
      <button
        type="button"
        onClick={onClickLogout}
        className="header-logout-btn"
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)

import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginRoute = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  const onSubmitFailure = errMsg => {
    setErrorMessage(errMsg)
    setShowError(true)
    setPassword('')
    setUsername('')
  }
  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const onChangeUserName = event => {
    setUsername(event.target.value)
  }
  const onChangePassword = event => {
    setPassword(event.target.value)
  }
  const onChangeToggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg-container">
      <form className="login-form-container" onSubmit={submitForm}>
        <img
          className="login-logo"
          src="https://raw.githubusercontent.com/rajmanish23/nxt-assess/master/src/assets/login-page-logo.png"
          alt="login website logo"
        />
        <div className="login-input-container">
          <label className="login-input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            id="username"
            className="login-input-fields"
            onChange={onChangeUserName}
          />
          <label className="login-input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Password"
            id="password"
            className="login-input-fields"
            onChange={onChangePassword}
          />
          <label className="login-showpassword-label">
            <input type="checkbox" onChange={onChangeToggleShowPassword} />
            <span className="checkbox-name">Show Password</span>
          </label>
        </div>
        <div className="login-button-error-container">
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="login-error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default LoginRoute

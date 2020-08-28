import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, Snackbar } from '@material-ui/core'
import { authFormStyles } from './styles'

export const AuthForm = ({ history, location }) => {
  const classes = authFormStyles()
  const hash = { login: 'signup', signup: 'login' }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [method, setMethod] = useState(
    location.pathname.substring(1) === 'signup' ? 'signup' : 'login'
  )

  useEffect(() => {
    !(async () => {
      try {
        const { data: user } = await axios.get('/auth/me')
        if (user.id) history.push('/search')
      } catch (error) {
        return
      }
    })()
  }, [])

  const handleOnChange = event => {
    switch (event.target.name) {
      case 'username':
        setUsername(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      default:
        return
    }
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post(`/auth/${method}`, {
        username,
        password,
      })
      setUsername('')
      setPassword('')
      history.push('/search')
    } catch (error) {
      setLoginError(true)
    }
  }

  return (
    <div id="auth-form" className={classes.auth}>
      <Snackbar
        message={
          method === 'login'
            ? 'Wrong username and/or password'
            : 'That username already exists!'
        }
        open={loginError}
        onClose={() => setLoginError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <form onSubmit={handleOnSubmit} className={classes.form}>
        <TextField
          required
          name="username"
          label="Username"
          value={username}
          onChange={handleOnChange}
        />
        <TextField
          required
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={handleOnChange}
        />
        <Button type="submit" variant="outlined">
          {method === 'login' ? 'Login' : 'Sign Up'}
        </Button>
        <span>
          {method === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <span
            className={classes.method}
            onClick={() => {
              setMethod(hash[method])
            }}
          >
            <Link to={`/${hash[method]}`}>
              {method === 'login' ? 'Sign Up' : 'Login'}
            </Link>
          </span>
        </span>
      </form>
    </div>
  )
}

export default AuthForm

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Snackbar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  login: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  method: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'lightblue',
    },
  },
}))

export const AuthForm = ({ history, location }) => {
  const classes = useStyles()
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
        if (user.id) history.push('/home')
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
      const { data: user } = await axios.post(`/auth/${method}`, {
        username,
        password,
      })
      setUsername('')
      setPassword('')
      history.push('/home')
    } catch (error) {
      setLoginError(true)
    }
  }

  return (
    <div id="auth-form">
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
      <form onSubmit={handleOnSubmit} className={classes.login}>
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
            onClick={() => {
              setMethod(hash[method])
              history.push(`/${hash[method]}`)
            }}
            className={classes.method}
          >
            {method === 'login' ? 'Sign Up' : 'Login'}
          </span>
        </span>
      </form>
    </div>
  )
}

export default AuthForm
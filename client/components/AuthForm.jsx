import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, Snackbar, Typography } from '@material-ui/core'
import { authFormStyles } from './styles'

export const AuthForm = ({ history, location }) => {
  const classes = authFormStyles()
  const hash = { login: 'signup', signup: 'login' }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [method, setMethod] = useState(
    location.pathname.substring(1) === 'signup' ? 'signup' : 'login'
  )

  document.title = `The Shoppies - ${method === 'login' ? 'Login' : 'Sign Up'}`

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
      setError(true)
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
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Typography align="center" variant="h2">
        {method === 'login' ? 'Login' : 'Sign Up'}
      </Typography>
      <form onSubmit={handleOnSubmit} className={classes.form}>
        <TextField
          style={{ color: 'black' }}
          required
          name="username"
          label={method === 'login' ? 'Username' : 'Create username'}
          value={username}
          onChange={handleOnChange}
        />
        <TextField
          required
          name="password"
          label={method === 'login' ? 'Password' : 'Create password'}
          type="password"
          value={password}
          onChange={handleOnChange}
        />
        <Button type="submit" variant="outlined" className={classes.button}>
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

import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Movies, AuthForm } from './components'

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    !(async () => {
      const { data: user } = await axios.get('/auth/me')
      setUserLoggedIn(!!user.id)
      console.log(user)
      console.log(userLoggedIn)
    })
  }, [])

  return (
    <Router>
      <Switch>
        <Route path={['/login', '/signup', '/']} component={AuthForm} />
      </Switch>
    </Router>
  )
}

render(<App />, document.getElementById('app'))

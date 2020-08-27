import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthForm, Home } from './components'

const App = () => (
  <Router>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path={['/login', '/signup', '/']} component={AuthForm} />
    </Switch>
  </Router>
)

render(<App />, document.getElementById('app'))

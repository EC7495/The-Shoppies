import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthForm, MovieSearch, Nominations } from './components'

const App = () => (
  <Router>
    <Switch>
      <Route path="/search" component={MovieSearch} />
      <Route path="/my-nominations" component={Nominations} />
      <Route path={['/login', '/signup', '/']} component={AuthForm} />
    </Switch>
  </Router>
)

render(<App />, document.getElementById('app'))

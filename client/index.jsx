import React from 'react'
import { render } from 'react-dom'
import { Movies } from './components'

const App = () => (
  <div id="index">
    <h1>Welcome to my puppies page</h1>
    <Movies />
  </div>
)

render(<App />, document.getElementById('app'))

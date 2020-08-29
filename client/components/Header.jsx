import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Snackbar } from '@material-ui/core'
import { headerStyles } from './styles'

const Header = ({ history, location }) => {
  const classes = headerStyles()
  const [error, setError] = useState(false)

  const handleOnClick = async () => {
    try {
      await axios.post('/auth/logout')
      history.push('/login')
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div id="header">
      <Snackbar
        message="Oops, an error ocurred. Try again."
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <header className={classes.header}>
        <Link to="/my-nominations" className={classes.headerItem}>
          Nominations
        </Link>
        <Link to="/search" className={classes.headerItem}>
          Search
        </Link>
        <Link
          to={`${location.pathname}`}
          onClick={handleOnClick}
          className={classes.headerItem}
        >
          Logout
        </Link>
      </header>
    </div>
  )
}

export default Header

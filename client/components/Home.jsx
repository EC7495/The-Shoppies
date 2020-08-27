import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import { Movies } from '../components'

const useStyles = makeStyles(theme => ({
  home: {
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    height: '10vh',
    background: 'lightgray',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'sticky',
  },
}))

export const Home = ({ history }) => {
  const classes = useStyles()
  const [user, setUser] = useState({})

  useEffect(() => {
    !(async () => {
      try {
        const { data: fetchedUser } = await axios.get('/auth/me')
        setUser(fetchedUser)
      } catch (error) {
        history.push('/login')
      }
    })()
  }, [])

  return user.id ? (
    <div id="home" className={classes.home}>
      <header className={classes.header}>
        <span>Nominations</span>
        <span>Search</span>
        <span>Logout</span>
      </header>
      <Movies user={user} />
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default Home

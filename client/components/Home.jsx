import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography } from '@material-ui/core'
import { Movies } from '../components'

export const Home = ({ history }) => {
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
    <div id="home">
      <Typography gutterBottom align="center" variant="h1">
        Welcome {user.username}
      </Typography>
      <Movies />
    </div>
  ) : (
    <Typography gutterBottom align="center" variant="h1">
      Loading...
    </Typography>
  )
}

export default Home

import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Home = props => {
  const [user, setUser] = useState({})

  useEffect(() => {
    !(async () => {
      const { data: fetchedUser } = await axios.get('/auth/me')
      fetchedUser.id ? setUser(fetchedUser) : props.history.push('/login')
    })
  }, [])

  return (
    <div id="home">
      <h1>Welcome {user.id ? user.username : ''}</h1>
    </div>
  )
}

export default Home

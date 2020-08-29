import React, { useState, useEffect } from 'react'
import { Snackbar, Typography } from '@material-ui/core'
import axios from 'axios'
import { Header, SingleNomination } from '../components'
import { nominationsStyles } from './styles'

const Nominations = ({ history, location }) => {
  const classes = nominationsStyles()
  const [userNominations, setUserNominations] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    !(async () => {
      try {
        const { data: fetchedNominations } = await axios.get(
          '/api/movies/user-nominations'
        )
        setUserNominations(fetchedNominations)
      } catch (error) {
        setError(true)
        history.push('/search')
      }
    })()
  }, [])

  const handleOnClick = async movieId => {
    try {
      await axios.put('/api/users/nominate-movie/?remove=true', { movieId })
      setUserNominations(
        userNominations.filter(nomination => nomination.imdbID !== movieId)
      )
    } catch (error) {
      setError(true)
      return
    }
  }

  return userNominations.length ? (
    <div id="nominations" className={classes.nominations}>
      <Snackbar
        message="Oops, There was an error. Try again!"
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Header history={history} location={location} />
      <Typography align="center" variant="h1">
        Your Nominations
      </Typography>
      <div className={classes.mappedNominations}>
        {userNominations.map(nomination => (
          <SingleNomination
            key={nomination.imdbID}
            nomination={nomination}
            handleOnClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <Header history={history} location={location} />
      <div>You don't have any nominations!</div>
    </div>
  )
}

export default Nominations

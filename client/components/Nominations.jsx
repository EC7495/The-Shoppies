import React, { useState, useEffect } from 'react'
import { Snackbar, Typography, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { Header, SingleNomination } from '../components'
import { nominationsStyles } from './styles'

const Nominations = ({ history, location }) => {
  const classes = nominationsStyles()
  const [nominations, setNominations] = useState([false])
  const [removed, setRemoved] = useState(false)
  const [error, setError] = useState(false)

  document.title = 'The Shoppies - My Nominations'

  useEffect(() => {
    !(async () => {
      try {
        const { data: fetchedNominations } = await axios.get(
          '/api/movies/user-nominations'
        )
        setNominations(fetchedNominations)
      } catch (error) {
        setError(true)
        history.push('/search')
      }
    })()
  }, [])

  const handleOnClick = async movieId => {
    try {
      await axios.put('/api/users/nominate-movie/?remove=true', { movieId })
      setNominations(
        nominations.filter(nomination => nomination.imdbID !== movieId)
      )
      setRemoved(true)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div>
      <Snackbar
        message="Oops, There was an error. Try again!"
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
      />
      <Snackbar
        message={`Nomination removed! ${
          5 - nominations.length
        }  nominations left.`}
        open={removed}
        onClose={() => setRemoved(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000}
      />
      {nominations.length ? (
        nominations[0] ? (
          <div id="nominations" className={classes.nominations}>
            <Header history={history} location={location} />
            <Typography align="center" variant="h2">
              Your Nominations
            </Typography>
            <div className={classes.mappedNominations}>
              {nominations.map(nomination => (
                <SingleNomination
                  key={nomination.imdbID}
                  nomination={nomination}
                  handleOnClick={handleOnClick}
                />
              ))}
            </div>
          </div>
        ) : (
          <CircularProgress />
        )
      ) : (
        <div>
          <Header history={history} location={location} />
          <Typography align="center" variant="h2">
            No nominations yet!
          </Typography>
        </div>
      )}
    </div>
  )
}

export default Nominations

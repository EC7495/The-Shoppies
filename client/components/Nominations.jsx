import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'
import axios from 'axios'
import { Header, SingleNomination } from '../components'
import { nominationsStyles } from './styles'

const Nominations = ({ history, location }) => {
  const classes = nominationsStyles()
  const [userNominations, setUserNominations] = useState([])
  const [fetchingError, setFetchingError] = useState(false)

  useEffect(() => {
    !(async () => {
      try {
        const { data: fetchedNominations } = await axios.get(
          '/api/movies/user-nominations'
        )
        setUserNominations(fetchedNominations)
      } catch (error) {
        setFetchingError(true)
        history.push('/search')
      }
    })()
  }, [])

  return userNominations.length ? (
    <div id="nominations" className={classes.nominations}>
      <Snackbar
        message="Oops. There was an error retrieving your nominations. Try again!"
        open={fetchingError}
        onClose={() => setFetchingError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Header history={history} location={location} />
      <div className={classes.mappedNominations}>
        {userNominations.map(nomination => (
          <SingleNomination key={nomination.imdbID} nomination={nomination} />
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

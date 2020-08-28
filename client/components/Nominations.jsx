import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'
import axios from 'axios'
import Header from './Header'

const Nominations = ({ history, location }) => {
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
    <div id="nominations">
      <Snackbar
        message="Oops. There was an error retrieving your nominations. Try again!"
        open={fetchingError}
        onClose={() => setFetchingError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Header history={history} location={location} />
      {userNominations.map(nom => (
        <h1 key={nom.imdbID}>{nom.Title}</h1>
      ))}
    </div>
  ) : (
    <div>
      <Header history={history} location={location} />
      <div>You don't have any nominations!</div>
    </div>
  )
}

export default Nominations

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'
import { SearchResults, Header, SearchForm } from '../components'
import { movieSearchStyles } from './styles'

const MovieSearch = ({ history, location }) => {
  const classes = movieSearchStyles()
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])

  document.title = 'The Shoppies - Search'

  useEffect(() => {
    !(async () => {
      try {
        const { data: fetchedUser } = await axios.get('/auth/me')
        fetchedUser.id ? setUser(fetchedUser) : history.push('/login')
      } catch (error) {
        history.push('/login')
      }
    })()
  }, [])

  return user.id ? (
    <div id="movie-search" className={classes.movieSearch}>
      <Header location={location} history={history} />
      <SearchForm setMovies={setMovies} />
      <SearchResults user={user} movies={movies} />
    </div>
  ) : (
    <CircularProgress />
  )
}

export default MovieSearch

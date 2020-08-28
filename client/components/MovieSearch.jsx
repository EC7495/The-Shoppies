import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchResults, Header, SearchForm } from '../components'
import { movieSearchStyles } from './styles'

const MovieSearch = ({ history, location }) => {
  const classes = movieSearchStyles()
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])

  useEffect(() => {
    !(async () => {
      try {
        const { data: fetchedUser } = await axios.get('/auth/me')
        user.id ? setUser(fetchedUser) : history.push('/login')
      } catch (error) {
        return
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
    <h1>Loading...</h1>
  )
}

export default MovieSearch

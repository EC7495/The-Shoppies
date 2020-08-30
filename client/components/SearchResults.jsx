import React from 'react'
import { Typography } from '@material-ui/core'
import SingleMovie from './SingleMovie'
import { searchResultsStyles } from './styles'

const SearchResults = ({ user, movies }) => {
  const classes = searchResultsStyles()

  return (
    <div id="search-results" className={classes.searchResults}>
      {movies.length ? (
        <div id="all-movies" className={classes.allMovies}>
          {movies.map(movie => (
            <SingleMovie key={movie.imdbID} movie={movie} user={user} />
          ))}
        </div>
      ) : (
        <Typography align="center" variant="h2">
          Search for your favorite movies!
        </Typography>
      )}
    </div>
  )
}

export default SearchResults

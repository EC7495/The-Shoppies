import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  movies: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Movies = props => {
  const classes = useStyles()
  const [movieTitle, setMovieTitle] = useState('')
  const [movieYear, setMovieYear] = useState('')
  const [movieType, setMovieType] = useState('')
  const [movies, setMovies] = useState([])

  const handleOnChange = event => {
    switch (event.target.name) {
      case 'title':
        setMovieTitle(event.target.value)
        break
      case 'year':
        setMovieYear(event.target.value)
        break
      case 'type':
        setMovieType(event.target.value)
        break
      default:
        return
    }
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    setMovieTitle('')
    setMovieYear('')
    setMovieType('')
    const {
      data: { Search: fetchedMovies },
    } = await axios.get(
      `/api/movies/search-movies/?title=${movieTitle}&year=${movieYear}&type=${movieType}`
    )

    setMovies(fetchedMovies)
  }

  return (
    <div id="movies" className={classes.movies}>
      <form onSubmit={handleOnSubmit} className={classes.form}>
        <TextField
          required
          name="title"
          label="Title"
          variant="outlined"
          value={movieTitle}
          onChange={handleOnChange}
        />
        <TextField
          name="year"
          label="Year"
          variant="outlined"
          value={movieYear}
          onChange={handleOnChange}
          type="number"
          min={1900}
          max={new Date().getFullYear()}
        />
        <div id="movie-type">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            variant="outlined"
            value={movieType}
            onChange={handleOnChange}
          >
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="episode">Episode</MenuItem>
          </Select>
        </div>
        <Button type="submit" variant="outlined">
          Enter
        </Button>
        {movies.map(movie => (
          <div key={movie.imdbID}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
          </div>
        ))}
      </form>
    </div>
  )
}

export default Movies

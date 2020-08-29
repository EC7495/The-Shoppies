import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from '@material-ui/core'
import { searchFormStyles } from './styles'

const SearchForm = ({ setMovies }) => {
  const classes = searchFormStyles()
  const [movieTitle, setMovieTitle] = useState('')
  const [movieYear, setMovieYear] = useState('')
  const [movieType, setMovieType] = useState('')
  const [error, setError] = useState(false)

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
    try {
      event.preventDefault()
      setMovieTitle('')
      setMovieYear('')
      setMovieType('')
      const {
        data: { Search: fetchedMovies },
      } = await axios.get(
        `/api/movies/search-movies/?title=${movieTitle}&year=${movieYear}&type=${movieType}`
      )

      if (!fetchedMovies) setError(true)
      setMovies(fetchedMovies || [])
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div id="search-form">
      <Snackbar
        message="Oops, There was an error. Try again!"
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
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
          Search
        </Button>
      </form>
    </div>
  )
}

export default SearchForm

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
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState(false)

  const handleOnChange = event => {
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value)
        break
      case 'year':
        setYear(event.target.value)
        break
      case 'type':
        setType(event.target.value)
        break
      default:
        return
    }
  }

  const handleOnSubmit = async event => {
    try {
      event.preventDefault()
      setTitle('')
      setYear('')
      setType('')
      const {
        data: { Search: fetchedMovies },
      } = await axios.get(
        `/api/movies/search-movies/?title=${title}&year=${year}&type=${type}`
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
          value={title}
          onChange={handleOnChange}
        />
        <TextField
          name="year"
          label="Year"
          variant="outlined"
          value={year}
          onChange={handleOnChange}
          type="number"
          min={1900}
          max={new Date().getFullYear()}
        />
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          variant="outlined"
          value={type}
          onChange={handleOnChange}
        >
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="series">Series</MenuItem>
          <MenuItem value="episode">Episode</MenuItem>
        </Select>
        <Button type="submit" variant="outlined" className={classes.button}>
          Search
        </Button>
      </form>
    </div>
  )
}

export default SearchForm

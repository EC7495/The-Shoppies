import React, { useState } from 'react'
import axios from 'axios'

const Movies = () => {
  const [movieTitle, setMovieTitle] = useState('')
  const [movies, setMovies] = useState([])

  const handleOnChange = event => {
    setMovieTitle(event.target.value)
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    setMovieTitle('')
    const {
      data: { Search: fetchedMovies },
    } = await axios.get(`/api/movies/${movieTitle}`)

    setMovies(fetchedMovies)
  }

  return (
    <div id="movies">
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="movie-title">Title</label>
        <input
          name="movie-title"
          value={movieTitle}
          onChange={handleOnChange}
        />
        <button type="submit">Enter</button>
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

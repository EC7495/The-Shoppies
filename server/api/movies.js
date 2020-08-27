if (process.env.NODE_ENV === 'development') require('../../secrets')

const router = require('express').Router()
const axios = require('axios')

// search movies by title, year, and type
router.get('/search-movies', async (req, res, next) => {
  try {
    const { title, year, type, page } = req.query
    const { data: searchedMovies } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}${
        year ? `&y=${year}` : ''
      }${type ? `&type=${type}` : ''}&page=${page || 1}`
    )
    res.json(searchedMovies)
  } catch (error) {
    next(error)
  }
})

// retrieve all movies nominated by user
router.get('/user-nominations', async (req, res, next) => {
  try {
    const userNominations = req.user.nominations
    const moviesNominated = []

    for (const movieId of userNominations) {
      const { data: nominatedMovie } = await axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieId}`
      )

      moviesNominated.push(nominatedMovie)
    }

    res.json(moviesNominated)
  } catch (error) {
    next(error)
  }
})

module.exports = router

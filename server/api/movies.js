if (process.env.NODE_ENV === 'development') require('../../secrets')

const router = require('express').Router()
const axios = require('axios')

// search movies by title, year, and type
router.get('/search-movies', async (req, res, next) => {
  try {
    const { title, year, type, page } = { ...req.query }
    const { data: movies } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}${
        year ? `&y=${year}` : ''
      }${type ? `&type=${type}` : ''}&page=${page || 1}`
    )
    res.json(movies)
  } catch (error) {
    next(error)
  }
})

module.exports = router

if (process.env.NODE_ENV === 'development') require('../../secrets')

const router = require('express').Router()
const axios = require('axios')

// search movies by title
router.get('/:movieTitle', async (req, res, next) => {
  try {
    const { data: movies } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.params.movieTitle}`
    )
    res.json(movies)
  } catch (error) {
    next(error)
  }
})

module.exports = router

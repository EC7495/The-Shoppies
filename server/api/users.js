const router = require('express').Router()

// add movie nomination to nomination's list for logged in user
router.put('/nominate-movie', async (req, res, next) => {
  try {
    const movieId = req.body.movieId
    const user = req.user

    if (user.nominations < 5) {
      await user.update({
        nominations: [...user.nominations, movieId],
      })
      res.status(202).json(user)
    } else {
      res.status(406).json({ error: 'Max nominations reached' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

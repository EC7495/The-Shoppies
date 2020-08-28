const router = require('express').Router()

// nominate or remove nomination for movie
router.put('/nominate-movie', async (req, res, next) => {
  try {
    const movieId = req.body.movieId
    const user = req.user
    const remove = req.query.remove

    if (remove) {
      const nominations = user.nominations.filter(id => movieId !== id)
      await user.update({ nominations })
      res.status(202).json(user)
    } else if (user.nominations.length < 5) {
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

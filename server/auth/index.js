const router = require('express').Router()
const User = require('../db/models/User')

router.get('/me', (req, res) => {
  req.user ? res.json(req.user) : res.sendStatus(401)
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    })
    if (!user || !user.correctPassword(req.body.password)) {
      res.status(401).json({ error: 'Wrong username and/or password' })
    } else {
      req.login(user, error =>
        error ? next(error) : res.status(202).json(user)
      )
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    })
    req.login(user, error => (error ? next(error) : res.status(201).json(user)))
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).json({ error: 'User already exists' })
    } else {
      next(error)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect(204, '/')
})

module.exports = router

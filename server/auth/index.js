const router = require('express').Router()
const Users = require('../db/models/Users')

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: { username: req.body.username },
    })
    if (!user || !user.correctPassword(req.body.password)) {
      res.status(401).json({ error: 'Wrong username and/or password' })
    } else {
      req.login(user, error => (error ? next(error) : res.json(user)))
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await Users.create({
      username: req.body.username,
      password: req.body.password,
    })
    req.login(user, error => (error ? next(error) : res.json(user)))
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
  res.redirect('/')
})

module.exports = router

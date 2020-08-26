const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const db = require('./db')
const app = express()
const PORT = process.env.PORT || 8080

// redirect http requests to https
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else next()
  })
}

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// compression middleware:
// improves performance by reducing
// downloadable data sent to user
app.use(compression())

// static file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// api middleware
app.use('/api', require('./api'))

// sends 404 for any remaining requests with an extension (.js, .css, etc.)
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html for possibly valid front-end routes
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

!(async () => {
  await db.sync({ force: process.env.NODE_ENV === 'development' })
  console.log('Database synced successfully...')
  app.listen(PORT, () =>
    console.log(`Listening on port:${PORT}\nhttp://localhost:${PORT}`)
  )
})()

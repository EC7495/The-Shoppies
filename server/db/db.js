if (process.env.NODE_ENV === 'development') require('../../secrets')

const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
})

module.exports = db

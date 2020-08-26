const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('movie', {
  title: {
    type: Sequelize.STRING,
  },
})

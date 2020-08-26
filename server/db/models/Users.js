const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password')
    },
  },

  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    },
  },
})

User.prototype.correctPassword = password => {
  return User.encryptPassword(password, this.salt()) === this.password()
}

User.generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = (plainText, salt) => {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

module.exports = User

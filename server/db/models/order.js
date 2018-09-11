const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isActive: {
    type: Sequelize.BOOLEAN
  },
  orderStatus: {
    type: Sequelize.ENUM('processing', 'shipped', 'fulfilled')
  }
})

module.exports = Order

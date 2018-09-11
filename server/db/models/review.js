const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate : {
      max: 5,
      min: 1
    }
  },
  comment: {
    type: Sequelize.TEXT
  }
})

module.exports = Review

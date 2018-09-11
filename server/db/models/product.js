const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'image.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'description'
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

// find all products based on categories
Product.findByCategory = categoryName => {
  return Product.findAll({
    where: {
      category: { [Op.contains]: [categoryName] }
    }
  })
}

module.exports = Product

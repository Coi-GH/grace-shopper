const router = require('express').Router()
const { Order } = require('../db/models')

//retrieves all orders from database
//TODO:  Restrict access to admin users
router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: null
    },
    include: [{all: true}]
  })
    .then(orders => res.status(200).json(orders))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{all: true}]
  })
    .then(orders => {
      return res.status(200).json(orders)
    })
    .catch(next)
})


module.exports = router

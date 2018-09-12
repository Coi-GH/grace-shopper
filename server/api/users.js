const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'billingAddress', 'shippingAddress', 'userType']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'billingAddress', 'shippingAddress', 'userType']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

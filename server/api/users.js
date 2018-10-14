const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'billingAddress',
        'shippingAddress',
        'userType',
        'resetPassword'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'billingAddress',
        'shippingAddress',
        'userType',
        'resetPassword'
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } })
    res.json(req.params.id)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let updateUser = await User.findById(req.params.id)
    updateUser.update(req.body)
    res.json(updateUser)
  } catch (err) {
    next(err)
  }
})

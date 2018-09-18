const router = require('express').Router()
const { Order, Product, User } = require('../db/models')
const { userLoggedIn, getCart, getOrderProduct } = require('./helpers')

//GET routes
//retrieves a user's cart
router.get('/cart', (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.session.passport.user,
      isActive: true
    },
    include: [{model: Product}]
  })
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(next)
})

//retrieves all of a user's orders
router.get('/user/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    },
    include: [{all: true}]
  })
    .then(orders => res.status(200).json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id,
    {include: [{model: User}, {model: Product}]})
    .then(order => res.status(200).json(order))
    .catch(next)
})

//retrieves all orders from database
//TODO:  Restrict access to admin users
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{all: true}]
  })
    .then(orders => {
      return res.status(200).json(orders)
    })
    .catch(next)
})

//POST routes
router.post('/cart', async (req, res, next) => {
  try {
    const { id: productId, quantity } = req.body
    const userId = req.session.passport.user
    if (userLoggedIn(req)) {
      const cart = await getCart(userId)
      if (cart) {
        const orderProduct = await getOrderProduct(productId, cart.id)
        const updatedOrder = await orderProduct.update({
          quantity: orderProduct.quantity + quantity
        })
        res.json(updatedOrder)
      }
    }
  } catch (error) {
    res.send(error)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body
    if (userLoggedIn(req)) {
        const orderProduct = await getOrderProduct(productId, cartId)
        const updatedOrder = await orderProduct.update({
          quantity: quantity
        })
        res.json(updatedOrder)
      }
    } catch (error) {
    res.send(error)
  }
})

//DELETE routes
router.delete('/cart', async (req, res, next) => {
  try {
    const { cartId, productId } = req.query
    if (userLoggedIn(req)) {
      const orderProduct = await getOrderProduct(productId, cartId)
      const emptyArray = await orderProduct.destroy()
      if (emptyArray.length === 0) {
        console.log('productId', productId)
        res.send(productId)
      } else {
        const err = new Error('Database error')
        console.error(err, emptyArray)
        res.send(err)
      }
    }
  } catch (error) {
    //console.error(error)
    res.send(error)
  }
})

module.exports = router

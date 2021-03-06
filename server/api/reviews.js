const router = require('express').Router()
const { Review, Product, User } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{model: Product}, {model: User}]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id, {
      include: [{model: Product}, {model: User}]
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.get('/product/:id', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{model: Product}, {model: User}],
      where: {productId: req.params.id}
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

module.exports = router

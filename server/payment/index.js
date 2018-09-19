const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY || require('../../secrets').STRIPE_SECRET_TEST_KEY)

router.post('/', async (req, res, next) => {
  const { amount, currency, source, /*userId*/ } = req.body
  const charge = await stripe.charges.create({
    amount,
    currency,
    source
  })

  res.json(charge)
})

module.exports = router



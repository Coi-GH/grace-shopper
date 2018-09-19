const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY || require('../../secrets').STRIPE_SECRET_TEST_KEY)

router.post('/', async (req, res, next) => {
  const { amount, currency, source, receipt_email /*userId*/ } = req.body
  console.log('email', receipt_email)
  const charge = await stripe.charges.create({
    amount,
    currency,
    source,
    receipt_email
  })

  res.json(charge)
})

module.exports = router



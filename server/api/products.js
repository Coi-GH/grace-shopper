'use strict'

const express = require('express')
const { Product, Category } = require('../db/models')
const router = express.Router()
const url = require('url')
const querystring = require('querystring')
const bodyParser = require('body-parser')

// route to serve up all products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Category }]
  })
    .then(products => res.status(200).json(products))
    .catch(next)
})

// route to serve up a single product by id
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, {
    include: [{ model: Category }]
  })
    .then(product => res.status(200).json(product))
    .catch(next)
})

module.exports = router

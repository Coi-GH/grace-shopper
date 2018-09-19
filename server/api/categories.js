'use strict'

const express = require('express')
const { Product, Category } = require('../db/models')
const router = express.Router()

// GET

router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{ model: Product, through: 'productcategory' }]
  })
    .then(category => res.status(200).json(category))
    .catch(next)
})

router.get('/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId, {
    include: [{ model: Product, through: 'productcategory' }]
  })
    .then(products => res.status(200).json(products))
    .catch(next)
})

// POST

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next)
})

// PUT

router.put(':/categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then(category => {
      if (category) {
        category.update(req.body).then(updatedCategory => {
          return res.send(updatedCategory)
        })
      }
      const err = new Error('Category not found.')
      err.status = 404
      next(err)
    })
    .catch(next)
})

// DELETE

router.delete(':/categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then(category => {
      if (!category) {
        const err = new Error('Category not found.')
        err.status = 404
        next(err)
      }
      if (category) {
        category
          .destroy({ force: true })
          .then(categories => res.json(categories))
      }
    })
    .catch(next)
})

module.exports = router

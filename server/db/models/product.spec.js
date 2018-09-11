'use strict'

const chai = require('chai')
const expect = chai.expect

const db = require('../index')
const Product = db.model('product')
const Category = db.model('category')

describe('Product model', () => {
  describe('Validations', () => {
    let product

    before(() => {
      product = Product.build()
    })

    it('should require name', async () => {
      try {
        await product.validate()
        throw new Error('Validation succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('name')
      }
    })
  })

  describe('Product/Category association', () => {
    let product1, product2, category1

    beforeEach(async () => {
      category1 = await Category.create({
        id: 1,
        name: 'Chairs'
      })

      await Category.create({
        id: 2,
        name: 'Beds'
      })

      product1 = await Product.create({
        name: 'Chair 1',
        categoryId: 1
      })

      await Product.create({
        name: 'Chair 2',
        categoryId: 2
      })

      product2 = await Product.create({
        name: 'Chair 3',
        categoryId: 1
      })
    })

    describe('Product', () => {
      it('should have associated categories', async () => {
        const result = await category1.hasProducts([product1, product2])
        expect(result).to.be.true
      })
    })
  })
})

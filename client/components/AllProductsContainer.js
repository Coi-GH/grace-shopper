import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllProducts from './AllProducts'
import { fetchAllProducts } from '../store/product'

const mapStateToProps = state => {
  return {
    products: state.product.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAllProducts: () => dispatch(fetchAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

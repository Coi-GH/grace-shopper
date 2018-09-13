import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'
import { fetchProduct } from '../store/product'

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSingleProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

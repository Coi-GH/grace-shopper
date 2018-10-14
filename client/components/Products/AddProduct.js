import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import ProductForm from './ProductForm'
import { postProduct } from '../../store/product'

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      image: '',
      description: '',
      quantity: 0,
      categories: [],
      value: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = prop => event => {
    console.log('selecttarget', event.target.value)
    this.setState({ [prop]: event.target.value })
  }

  handleClick() {
    this.props.addProduct(this.state)
    this.props.history.push('/manageproducts')
  }

  render() {
    return (
      <div>
        <ProductForm
          product={this.state}
          titleText="Add Product"
          categories={this.props.categories}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          handleClick={this.handleClick}
          productAction={this.handleClick}
          buttonName="ADD"
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.allCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(postProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)

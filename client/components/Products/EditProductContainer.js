import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditProduct from './EditProduct'
import { fetchProduct, editProduct } from '../../store/product'
import CircularProgress from '@material-ui/core/CircularProgress'

// class EditProductContainer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = props.selectedProduct
//   }
//   componentDidMount() {
//     this.props.loadSingleProduct()
//     this.setState = this.props.selectedProduct
//   }

//   render() {
//     console.log('INSIDE THE EDITPRODUCTCONTAINER', this.props.isLoading)
//     const product = this.state
//     console.log('product state', this.state)
//     return (
//       <div>
// {this.props.isLoading || !this.props.selectedProduct ? (
//   <CircularProgress size={200} />
// ) : (
//   <EditProduct productToEdit={this.props.selectedProduct} />
// )}
//       </div>
//     )
//   }
// }git

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct,
    categories: state.category.allCategories,
    isLoading: state.product.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    loadSingleProduct: () => {
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct, editProduct, removeProduct } from '../../store/product'
import { toggleCategory } from '../../store/category'
import ProductForm from './ProductForm'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.selectedProduct

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCategories = this.handleCategories.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
    this.setState(this.props.selectedProduct)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedProduct.id !== prevProps.selectedProduct.id) {
      this.setState(this.props.selectedProduct)
    }
  }

  handleChange = prop => event => {
    const currentState = this.state
    this.setState({ ...currentState, [prop]: event.target.value })
  }

  handleUpdate(productData) {
    this.props.updateProduct(productData)
    if (!this.props.isLoading) {
      this.props.history.push('/manageproducts')
    }
  }

  handleDelete(productId) {
    this.props.deleteProduct(productId)
    if (!this.props.isLoading) {
      this.props.history.push('/manageproducts')
    }
  }

  handleCancel() {
    this.props.history.push('/manageproducts')
  }

  handleCategories(event) {
    const product = this.state.product
    const categoryId = event.target.value
    const filteredCategory = this.state.checkedCategories.filter(
      category => category.id === categoryId
    )[0]
    const checked = !filteredCategory.checked
    filteredCategory.checked = !filteredCategory.checked
    if (checked) {
      product.categories.push(filteredCategory)
    } else {
      product.categories.splice(product.categories.indexOf(filteredCategory))
    }
    this.setState({ product: product })
  }

  render() {
    const product = this.state
    return this.props.isLoading || this.state.id === 0 ? (
      <CircularProgress size={200} />
    ) : (
      <div>
        <ProductForm
          product={product}
          titleText="Edit Product"
          categories={this.props.selectedCategories}
          handleChange={this.handleChange}
          handleCategories={this.updateCategories}
          handleCancel={this.handleCancel}
          productAction={this.handleUpdate}
          buttonName="UPDATE"
        />
        <Button
          variant="contained"
          onClick={() => this.handleDelete(product.id)}
        >
          DELETE PRODUCT
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct,
    selectedCategories: state.product.selectedCategories,
    categories: state.category.allCategories,
    isLoading: state.product.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    loadSingleProduct: () => {
      dispatch(fetchProduct(productId))
    },
    toggleCategory: categoryId => {
      dispatch(toggleCategory(categoryId))
    },
    updateProduct: data => {
      dispatch(editProduct(productId, data))
    },
    deleteProduct: () => dispatch(removeProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import OrderItem from './OrderItem'
import ErrorView from './ErrorView'
import {
  fetchCart,
  updateCartItemQuantity,
  removeItemFromCart
} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      toCheckout: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleSubmit(updatedItemInfo) {
    if (updatedItemInfo.quantity > 0) {
      this.props.updateCartItemQuantity(updatedItemInfo)
    } else {
      this.props.removeItemFromCart(updatedItemInfo)
    }
  }

  handleCheckout() {
    this.setState({
      toCheckout: true
    })
  }

  render() {
    if (this.props.errorHappened) {
      return (
        <div>
          <ErrorView />
        </div>
      )
    }

    if (this.state.toCheckout) {
      return (<Redirect to="/checkout" />)
    }

    const { products } = this.props.cart
    const checkoutShouldBeAvailable = !(this.props.subtotal === 0) && !this.props.checkout
    return (
      <div>
        {this.props.isLoading || !products ? (
          <CircularProgress size={200} />
        ) : (
          <div>
            {products.map(product => (
              <OrderItem
                key={product.id}
                product={product}
                handleSubmit={this.handleSubmit}
              />
            ))}

              <Typography variant="headline">
                {`Subtotal: $${products
                  .reduce(
                    (accum, curr) =>
                      accum + curr.price / 100 * curr.orderProduct.quantity,
                    0
                  )
                  .toLocaleString()}`}
              </Typography>
            {checkoutShouldBeAvailable &&
            <Button size="large" variant="outlined" onClick={this.handleCheckout}>
              <Typography variant="headline">
                Checkout
              </Typography>
            </Button>
            }
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart.cartData,
    userId: state.user.currentUser.id,
    isLoading: state.cart.isLoading,
    errorHappened: state.cart.errorHappened,
    subtotal: state.cart.subtotal
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    updateCartItemQuantity: itemInfo =>
      dispatch(updateCartItemQuantity(itemInfo)),
    removeItemFromCart: itemInfo => dispatch(removeItemFromCart(itemInfo))
  }
}

export default connect(mapState, mapDispatch)(Cart)

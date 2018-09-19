import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { makePayment, fetchCart } from '../store/cart'
import Cart from './Cart'
import Typography from '@material-ui/core/Typography'

class Checkout extends Component {
  constructor() {
    super()
    this.onToken = this.onToken.bind(this)
  }

  onToken (token) {
    this.props.makePayment({
      source: token.id,
      userId: this.props.user.id,
      amount: this.props.subtotal,
      currency: 'usd',
      cartId: this.props.cartId,
      receipt_email: 'oluwafunmi.ojo@gmail.com'
    })

    this.props.history.push(`/orders/${this.props.cartId}`)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const { user, subtotal } = this.props
    return <div>
      { subtotal !== 0 ?
      <div>
      <Cart checkout={1} cartEmpty={this.props.subtotal === 0}/>
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_eRGqXtCXghlozssQP3iTYo6E"
        name={`${user.firstName} ${user.lastName}`}
        amount={subtotal}
      />
      </div>
      :
      <Typography variant="display3">
        What are you doing here?  You don't have any items to check out.
      </Typography>
      }
      </div>

  }
}

const mapState = state => {
  return {
    cartId: state.cart.cartData.id,
    user: state.user.currentUser,
    subtotal: state.cart.subtotal
  }
}

const mapDispatch = dispatch => {
  return {
    makePayment: paymentInfo => dispatch(makePayment(paymentInfo)),
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Checkout)

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signUpUser} from '../store/user'

/**
 * COMPONENT
 */
const SignUpForm = props => {
  const {handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="billingAddress">
            <small>Billing Address</small>
          </label>
          <input name="billingAddress" type="text" />
        </div>
        <div>
          <label htmlFor="shippingAddress">
            <small>Shipping Address</small>
          </label>
          <input name="shippingAddress" type="text" />
        </div>
        <div>
          <label htmlFor="userType">
            <small>User Type</small>
          </label>
          <input name="userType" type="text" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Sign Up with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const billingAddress = evt.target.billingAddress.value
      const shippingAddress = evt.target.shippingAddress.value
      dispatch(signUpUser(firstName, lastName, email, password, billingAddress, shippingAddress))
    }
  }
}

export const SignUp = connect(mapSignup, mapDispatch)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

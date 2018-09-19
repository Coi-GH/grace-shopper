import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, SignUp, UserHome, Cart } from './components'
import { me } from './store'
import allUsers from './components/AllUsers'
import Home from './components/Home'
import SingleUser from './components/SingleUser'
import PasswordReset from '../client/components/PasswordReset'
import ManageProducts from './components/Products/ManageProducts'
import AllProductsContainer from './components/Products/AllProductsContainer'
import SingleProductContainer from './components/Products/SingleProductContainer'
import EditProduct from './components/Products/EditProduct'
import AddProduct from './components/Products/AddProduct'
import AllRoomsContainer from './components/Categories/AllRoomsContainer'
import SingleRoom from './components/Categories/SingleRoom'
import AllProductCategoriesContainer from './components/Categories/AllProductCategoriesContainer'
import { fetchAllProducts } from './store/product'
import { fetchAllCategories } from './store/category'
import ErrorView from './components/ErrorView'
import Checkout from './components/Checkout'
import { fetchCart } from './store/cart'
import AllOrders from './components/AllOrders'
import SingleOrder from './components/SingleOrder'
import AdminDashboard from './components/AdminDashboard'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadAllProducts()
    this.props.loadAllCategories()
    this.props.fetchCart()
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/products" component={AllProductsContainer} />
        <Route path="/products/:productId" component={SingleProductContainer} />
        <Route path="/error" component={ErrorView} />
        <Route exact path="/rooms" component={AllRoomsContainer} />
        <Route path="/rooms/:categoryId" component={SingleRoom} />
        <Route
          exact
          path="/product"
          component={AllProductCategoriesContainer}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/admin" component={AdminDashboard} />
            <Route exact path="/users" component={allUsers} />
            <Route path="/users/:id" component={SingleUser} />
            <Route path="/reset" component={PasswordReset} />
            <Route exact path="/manageproducts" component={ManageProducts} />
            <Route path="/manageproducts/products/add" component={AddProduct} />
            <Route
              path="/manageproducts/edit/product/:productId"
              component={EditProduct}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />

            <Route exact path="/orders" component={AllOrders} />
            <Route path="/orders/:id" component={SingleOrder} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />x`
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadAllProducts: () => dispatch(fetchAllProducts()),
    loadAllCategories: () => dispatch(fetchAllCategories()),
    fetchCart: () => dispatch(fetchCart())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

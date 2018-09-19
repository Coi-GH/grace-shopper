import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { fetchSingleOrder } from '../store/orders'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class SingleOrder extends Component {
  constructor(){
    super()
    this.state = {}
    store.subscribe(() => {
      if (this._mounted) this.setState(store.getState().order.selectedOrder)
    })
  }
  componentDidMount(){
    this.props.fetchData(this.props.match.params.id)
    this._mounted = true
  }
  componentWillUnmount(){
    this._mounted = false
  }
  render(){
    console.log(this.state)
    const order = this.state
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { order.products ?
          order.products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell><img src={product.image} width="100" /></TableCell>
              <TableCell>{product.orderProduct.quantity}</TableCell>
              <TableCell>${product.price / 100}</TableCell>
              <TableCell>${(product.price / 100) * product.orderProduct.quantity}</TableCell>
            </TableRow>
          ))
          :
          <TableRow>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
          }
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Shipping Address</TableCell>
            <TableCell>Billing Address</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
          { order.user ?
          <TableBody>
          <TableRow>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.createdAt.split('T')[0]}</TableCell>
            <TableCell>{order.user.shippingAddress}</TableCell>
            <TableCell>{order.user.billingAddress}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>
          </TableRow>
          </TableBody>
          : null}
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispathToProps = dispatch => ({
  fetchData: (id) => dispatch(fetchSingleOrder(id))
})

export default connect(mapStateToProps, mapDispathToProps)(SingleOrder)

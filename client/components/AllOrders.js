import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { fetchAllOrders } from '../store/orders'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class AllOrders extends Component {
  constructor(){
    super()
    this.state = {}
    store.subscribe(() => {
      if (this._mounted) this.setState(store.getState().order)
    })
  }
  componentDidMount() {
    this.props.fetchData()
    this._mounted = true
  }
  componentWillUnmount() {
    this._mounted = false
  }
  render(){
    const allOrders = this.state.allOrders
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Preview</TableCell>
            <TableCell>Shipping Address</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { allOrders && allOrders.length > 0 ?
          allOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user.firstName} {order.user.lastName}</TableCell>
              <TableCell>{order.createdAt.split('T')[0]}</TableCell>
              <TableCell><img src={order.products[0].image} width="300" /></TableCell>
              <TableCell>{order.user.shippingAddress}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
            </TableRow>
          )) :
          <TableRow>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchAllOrders())
})

export default connect(null, mapDispatchToProps)(AllOrders)

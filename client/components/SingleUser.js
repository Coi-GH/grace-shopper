import React, { Component } from 'react'
import store from '../store'
import { fetchSingleUser } from '../store/user'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// ---------- Only admins should be able to see this page
class SingleUser extends Component {
  constructor () {
    super()
    this.state = {}
    store.subscribe(() => {
      this.setState(store.getState().user)
    })
  }
  componentDidMount(){
    this.props.fetchData(this.props.match.params.id)
  }
  render () {
    let user, isAdmin;
    if (this.state.selectedUser) {
      user = this.state.selectedUser
      isAdmin = ('admin' === this.state.currentUser.userType)
    }
    return (
      user && isAdmin ?
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Billing Address</TableCell>
            <TableCell>Shipping Address</TableCell>
            <TableCell>User Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{user.firstName} {user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.billingAddress}</TableCell>
            <TableCell>{user.shippingAddress}</TableCell>
            <TableCell>{user.userType}</TableCell>
          </TableRow>
        </TableBody>
      </Table> : <p>NOT AVAILABLE</p>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: (id) => dispatch(fetchSingleUser(id))
})

export default connect(null, mapDispatchToProps)(SingleUser)

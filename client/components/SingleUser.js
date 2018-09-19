import React, { Component } from 'react'
import store from '../store'
import {
  fetchSingleUser,
  deleteUserOnServer,
  updateUserOnServer
} from '../store/user'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// ---------- Only admins should be able to see this page
class SingleUser extends Component {
  constructor() {
    super()
    this.state = {}
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    store.subscribe(() => {
      if (this._mounted) this.setState(store.getState().user)
    })
  }
  componentDidMount() {
    this.props.fetchData(this.props.match.params.id)
    this._mounted = true
  }
  componentWillUnmount() {
    this._mounted = false
  }
  delete(id) {
    this.props.deleteUser(id)
  }
  update (id) {
    this.props.updateUser(id, this.state.selectedUser)
  }
  handleChange(event) {
    const currentData = this.state.selectedUser
    this.setState({
      selectedUser: { ...currentData, [event.target.name]: event.target.value}
    })
  }
  render() {
    const id = this.props.match.params.id
    const user = this.state.selectedUser
    let isAdmin, isUser
    if (user) {
      isAdmin = 'admin' === this.state.currentUser.userType
      isUser = this.state.currentUser.id === user.id
    }
    const padding = {padding: '0.5em'}
    return (
      user && (isAdmin || isUser) ?
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Billing Address</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Reset Password?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.billingAddress}</TableCell>
              <TableCell>{user.shippingAddress}</TableCell>
              <TableCell>
                <Select
                  value={user.userType || 'user'} name="userType"
                  onChange={this.handleChange}>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={user.resetPassword || false} name="resetPassword"
                  onChange={this.handleChange}>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Link to="/users">
          <Button variant="outlined">BACK TO LIST</Button>
        </Link>
        { isAdmin ?
        <span>
          <span style={padding} />
          <Button variant="outlined" onClick={() => this.update(id)}>UPDATE</Button>
          <span style={padding} />
          <Button variant="contained" color="secondary" onClick={() => this.delete(id)}>DELETE</Button>
        </span> : null }
      </div>
      :
      <Link to="/users"><Button variant="outlined">BACK TO LIST</Button></Link>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(fetchSingleUser(id)),
  deleteUser: id => dispatch(deleteUserOnServer(id)),
  updateUser: (id, data) => dispatch(updateUserOnServer(id, data))
})

export default connect(null, mapDispatchToProps)(SingleUser)

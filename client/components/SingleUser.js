import React, { Component } from 'react'
import store from '../store'
import { fetchSingleUser, deleteUserOnServer, updateUserOnServer } from '../store/user'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import UpdateForm from './UpdateForm'

// ---------- Only admins should be able to see this page
class SingleUser extends Component {
  constructor () {
    super()
    this.state = {
      canEdit: false
    }
    this.delete = this.delete.bind(this)
    this.redirect = this.redirect.bind(this)
    this.update = this.update.bind(this)
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
    store.subscribe(() => {
      this.setState(store.getState().user)
    })
  }
  componentDidMount(){
    this.props.fetchData(this.props.match.params.id)
  }
  delete (id) {
    this.props.deleteUser(id)
  }
  redirect () {
    this.props.history.push('/users');
  }
  update (id, data) {
    this.props.updateUser(id, data)
  }
  toggleUpdateForm () {
    let canEdit = this.state.canEdit
    this.setState({
      canEdit: !canEdit
    })
  }
  render () {
    const id = this.props.match.params.id
    let user, isAdmin;
    if (this.state.selectedUser) {
      user = this.state.selectedUser
      isAdmin = ('admin' === this.state.currentUser.userType)
    }
    const padding = {padding: '0.5em'}
    return ([
      user && isAdmin ?
        <Table key='userData'>
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
        </Table>
      : <p key="error">NOT AVAILABLE</p>,
      <div key='buttons'>
        <br />
        <Button variant="outlined" onClick={() => this.redirect()}>BACK TO LIST</Button>
        <span style={padding} />
        <Button variant="outlined" onClick={this.toggleUpdateForm}>EDIT</Button>
        <span style={padding} />
        <Button variant="contained" color="secondary" onClick={() => this.delete(id)}>DELETE</Button>
      </div>,
      user && this.state.canEdit ? <span key='update' style={padding}><UpdateForm update={this.update} user={user} hide={this.toggleUpdateForm} /></span> : null
    ])
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: (id) => dispatch(fetchSingleUser(id)),
  deleteUser: (id) => dispatch(deleteUserOnServer(id)),
  updateUser: (id, data) => dispatch(updateUserOnServer(id, data))
})

export default connect(null, mapDispatchToProps)(SingleUser)

import React, { Component } from 'react'
import store from '../store'
import { fetchAllUsers } from '../store/user'
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// ---------- Only admins should be able to see this page
class AllUsers extends Component {
  constructor () {
    super()
    this.state = {}
    store.subscribe(() => {
      this.setState(store.getState().user)
    })
  }
  componentDidMount(){
    this.props.fetchData()
  }
  render () {
    let isAdmin, users;
    if (this.state.currentUser) {
      users = this.state.allUsers
      isAdmin = ('admin' === this.state.currentUser.userType)
    }
    return (
      <List>
        { users && isAdmin ?
        users.map(user => (
          <ListItem component="a" href={"/users/" + user.id} key={user.id} >
            <ListItemText
              primary={user.firstName + ' ' + user.lastName}
              secondary={user.userType}
            />
          </ListItem>
        )) : <p>NOT AVAILABLE</p> }
      </List>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchAllUsers())
})

export default connect(null, mapDispatchToProps)(AllUsers)

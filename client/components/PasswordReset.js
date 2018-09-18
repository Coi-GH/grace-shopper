import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateUserOnServer} from '../store/user'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

class PasswordReset extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const newPassword = event.target.newpassword.value
    const newData = {...this.props.currentUser, password: newPassword, resetPassword: false}
    this.props.updatePassword(this.props.currentUser.id, newData)
    this.props.history.push('/home')
  }
  render () {
    return (
      <Card style={{width: '40%'}}>
      <FormGroup style={{margin: "1em"}}>
        <Typography variant="subheading">
          Password reset is required!
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel>New Password</InputLabel>
            <Input name="newpassword" type="password" required />
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
        </FormGroup>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDistachToProps = dispatch => ({
  updatePassword: (id, data) => dispatch(updateUserOnServer(id, data))
})

export default connect(mapStateToProps, mapDistachToProps)(PasswordReset)

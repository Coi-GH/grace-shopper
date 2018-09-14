import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

export default class UpdateForm extends Component {
  constructor (props){
    super(props)
    this.state = this.props.user
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    const change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.update(this.state.id, this.state)
  }
  render () {
    const user = this.state
    const padding = {padding: '0.5em'}
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input value={user.firstName} name="firstName" onChange={this.handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input value={user.lastName} name="lastName" onChange={this.handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel>E-mail</InputLabel>
          <Input value={user.email} name="email" onChange={this.handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Billing Address</InputLabel>
          <Input value={user.billingAddress} name="billingAddress" onChange={this.handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="shippingAddress">Shipping Address</InputLabel>
          <Input value={user.shippingAddress} name="shippingAddress" onChange={this.handleChange} />
        </FormControl>
        <TextField
          classes={{}}
          select label="Type"
          value={user.userType}
          name="userType"
          onChange={this.handleChange}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="guest">Guest</MenuItem>
        </TextField>
        <br /><br />
        <Button variant="outlined" color="secondary" onClick={this.handleSubmit}>UPDATE</Button>
        <span style={padding} />
        <Button variant="outlined" onClick={this.props.hide}>CANCEL</Button>
      </div>
    )
  }
}

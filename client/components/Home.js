import React, { Component } from 'react'
import compose from 'recompose/compose'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { GridListTileBar } from '@material-ui/core'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  logoutButton: {
    color: '#d33300'
  }
})

class Home extends Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <img src="/images/banner-image.jpg" />
            <GridListTileBar>hi</GridListTileBar>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(Home))

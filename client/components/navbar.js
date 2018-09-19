import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import AccountCircle from '@material-ui/icons/AccountCircleOutlined'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 60
  },
  grow: {
    flexGrow: 1
  },
  buttonPadding: {
    bottomPadding: 3
  },
  navLinks: {
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'none'
  }
})

// const Navbar = props => {
//   const { classes } = props
class Navbar extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            <Link to="/home">
              <img src="/images/logo.png" width={55} />
            </Link>
          </Typography>
          {this.props.isLoggedIn ? (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/rooms">
                  Rooms
                </Link>
              </Button>
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/products">
                  Products
                </Link>
              </Button>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <AccountCircle />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/admin">View Profile</Link>
                </MenuItem>
                <MenuItem>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </MenuItem>
              </Menu>
              <IconButton color="inherit" component={Link} to="/cart">
                <CartIcon />
              </IconButton>
            </Grid>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button color="inherit">
                <Link to="/login">Login</Link>
              </Button>
              <Button color="inherit">
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button color="inherit">
                <Link to="/products">Products</Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

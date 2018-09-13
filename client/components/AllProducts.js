import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadAllProducts()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const products = this.props.products
    return (
      <div className="container">
        <TextField
          id="search"
          label="search for a product"
          className={classes.textField}
          value={this.state.search}
          onChange={this.handleChange}
          margin="normal"
        />
        {products && (
          <GridList cellHeight={500}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">All Products</ListSubheader>
            </GridListTile>
            {products.map(product => (
              <GridListTile key={product.id}>
                <img src={product.image} alt={product.name} />
                <Link to={`products/${product.id}`}>
                  <GridListTileBar
                    title={product.name}
                    subtitle={<span>{product.price}</span>}
                  />
                </Link>
              </GridListTile>
            ))}
          </GridList>
        )}
      </div>
    )
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AllProducts)

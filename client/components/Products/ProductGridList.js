import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'

export default class ProductGridList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      searchInput: ''
    }
    this.handleChange = this.handleChange.bind(this)
    console.log(this.state.products)
  }

  handleChange(event) {
    let updatedProductGrid = this.props.products.filter(product =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    this.setState({
      products: updatedProductGrid,
      searchInput: event.target.value
    })
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <form autoComplete="off">
          <TextField
            id="searchInput"
            name="searchInput"
            label="search for a product"
            value={this.state.searchInput}
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
            margin="normal"
          />
        </form>
        <GridList cellHeight={500} spacing={4} cols={3}>
          {this.state.searchInput === ''
            ? products.map(product => (
                <GridListTile key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <Link to={`products/${product.id}`}>
                    <GridListTileBar
                      title={product.name}
                      subtitle={<span>{product.price}</span>}
                    />
                  </Link>
                </GridListTile>
              ))
            : this.state.products.map(product => (
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
      </div>
    )
  }
}

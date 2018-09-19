import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CategoryGridList from './CategoryGridList'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { fetchSingleCategory } from '../../store/category'
import ProductGridList from '../Products/ProductGridList'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  heading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  caption: {
    textAlign: 'left',
    width: 475,
    padding: 20,
    margin: 'auto'
  },
  divider: {
    marginTop: 30,
    width: 475,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  titleText: {
    color: '#000',
    fontWeight: 'bolder'
  }
})

class SingleRoom extends Component {
  componentDidMount() {
    this.props.loadSingleCategory()
  }

  render() {
    const { classes } = this.props
    const category = this.props.category
    const categoryProducts = this.props.category.products
    console.log('category products', categoryProducts)
    return !categoryProducts ? (
      <CircularProgress size={200} />
    ) : (
      <div>
        <Grid container spacing={24}>
          <Grid className={classes.heading} item xs={12}>
            <Typography className={classes.titleText} variant="display2">
              {category.name}
            </Typography>
            <hr className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <ProductGridList products={categoryProducts} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    category: state.category.currentCategory,
    isLoading: state.category.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSingleCategory: () => {
      const categoryId = ownProps.match.params.categoryId
      dispatch(fetchSingleCategory(categoryId))
      console.log('dispatched')
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SingleRoom)
)

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    textAlign: 'left'
  },
  bar: {
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  quantityPicker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100
  },
  descriptionField: {
    height: 300,
    border: 1,
    borderStyle: 'solid'
  },
  chip: {
    margin: theme.spacing.unit
  },
  chips: {
    maxWidth: '30%'
  }
})

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = props.categories
  }
  handleChipDelete = data => () => {
    if (data.label === 'React') {
      alert('Clicked') // eslint-disable-line no-alert
    }
  }

  render() {
    const { classes } = this.props
    const product = this.props.product
    const titleText = this.props.titleText
    const handleChange = this.props.handleChange
    const handleCancel = this.props.handleCancel
    const categories = this.props.categories
    const productAction = this.props.productAction
    const buttonName = this.props.buttonName
    console.log('inside the form', product)
    return (
      product && (
        <div className={classes.root}>
          <AppBar className={classes.bar} position="static" color="default">
            <Toolbar>
              <Button onClick={() => productAction(product)}>
                {buttonName}
              </Button>
              <Button onClick={() => handleCancel()}>Cancel</Button>
            </Toolbar>
          </AppBar>
          <Typography variant="title">{titleText}</Typography>
          <Typography variant="subheading">Product Details</Typography>
          <Grid
            container
            spacing={24}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={6}>
              <TextField
                label="Product Name"
                id="name"
                className={classNames(classes.margin, classes.textField)}
                value={product.name}
                onChange={handleChange('name')}
              />
              <TextField
                label="Price"
                id="price"
                className={classNames(classes.margin, classes.textField)}
                placeholder="0"
                value={product.price}
                onChange={handleChange('price')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
              <TextField
                id="quantity"
                className={classes.quantityPicker}
                label="Quantity"
                name="quantity"
                required={true}
                value={product.quantity ? product.quantity : ''}
                onChange={handleChange('quantity')}
                type="number"
                inputProps={{ min: 0, max: 1000 }}
                margin="normal"
              />
              <TextField
                id="description"
                className={classNames(classes.margin, classes.textField)}
                label="Product Description"
                name="description"
                required={true}
                value={product.description}
                onChange={handleChange('description')}
                multiline={true}
                variant="filled"
                helperText="Enter a short description of the product or product details"
                rows="6"
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
            >
              {titleText === 'Add Product' ? (
                <div className={classes.chips}>
                  {categories.map(category => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      clickable
                      className={classes.chip}
                      variant="outlined"
                      color="secondary"
                      deleteIcon={<AddIcon />}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  {categories.map(category => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      className={classes.chip}
                      variant="outlined"
                      color="secondary"
                    />
                  ))}
                </div>
              )}
            </Grid>
            <Grid item xs={6}>
              <div>
                <InputLabel htmlFor="images">Product Images</InputLabel>
                <TextField
                  label="Image URL"
                  id="image-url"
                  className={classNames(classes.margin, classes.textField)}
                  value={product.image}
                  onChange={handleChange('image')}
                />
                <div>
                  <Typography variant="body2">Preview</Typography>
                  <img src={product.image} />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )
    )
  }
}

export default withStyles(styles, { withTheme: true })(ProductForm)

import React from 'react'
import { formatPrice } from '../helpers'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'

const styles = theme => ({
  root: {
    size: 2
  },
  image: {
    width: 200,
    height: 200
  }
})

class OrderItem extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const val = Number(event.target.value)
    if (!Number.isNaN(val)) {
      this.setState({
        quantity: Number(event.target.value)
      })
    }
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.product.orderProduct.quantity
    })
  }

  render() {
    const { image, name, description, id: productId } = this.props.product
    const { orderId: cartId } = this.props.product.orderProduct
    const price = formatPrice(this.props.product.price)
    const { classes, handleSubmit } = this.props

    return (
      <div key={productId}>
        <Grid container spacing={16}>
          <Grid item>
            <Input
              size={1}
              className={classes.root}
              name={productId.toString()}
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <Button
              size="small"
              onClick={() =>
                handleSubmit({ quantity: this.state.quantity, productId, cartId})
              }
            >
              Update
            </Button>
            <Button
              size="small"
              onClick={() =>
                handleSubmit({ quantity: 0, productId, cartId})
              }
            >
              Delete
            </Button>
          </Grid>

          <Grid item>
            <ButtonBase component="a" href={`/products/${productId}`}>
              <img src={image} alt={name} className={classes.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs>
              <Typography gutterBottom variant="subheading">
                {name}
              </Typography>
              <Typography gutterBottom variant="headline">
                {price}
              </Typography>
              <Typography gutterBottom>{description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(OrderItem)

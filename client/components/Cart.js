import React, {Component} from 'react'
import OrderItem from './OrderItem'

export class Cart extends Component {
  render() {
    return (
      <div>
        <OrderItem product={this.props.product} />
      </div>
    )
  }
}

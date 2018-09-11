import React from 'react';

const OrderItem = (props) => {
  return (
    <div>
        <p>{quantity}</p>
        <img src={imgUrl} />
        <p>{name}</p>
        <p>{price}</p>
        <p>{description}</p>
    </div>
  )
}

export default OrderItem;

export const formatPrice = price => {
  return `$${price/100}`
}

export const differentNumberProducts = (currProducts, prevProducts) => {
  return currProducts.length !== prevProducts.length
}

export const differentItemQuantities = (currProducts, prevProducts) => {
  for (let i = 0; i < currProducts.length; i++) {
    if (currProducts[i].orderProduct.quantity !== prevProducts[i].orderProduct.quantity) {
      return true
    }
  }
}

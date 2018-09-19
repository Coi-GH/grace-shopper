import axios from 'axios'
import history from '../history'

// ACTION TYPES
export const SET_CART = 'SET_CART'
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
export const SET_ADDED_PRODUCT = 'SET_ADDED_PRODUCT'
export const SET_UPDATED_ITEM_QUANTITY = 'SET_UPDATED_ITEM_QUANTITY'
export const SET_ERROR_STATUS = 'SET_ERROR_STATUS'
export const SET_CART_WITHOUT_REMOVED_ITEM = 'SET_CART_WITHOUT_REMOVED_ITEM'
export const SET_NO_PRODUCTS_STATUS = 'SET_NO_PRODUCTS_STATUS'
export const SET_PAYMENT_STATUS = 'SET_PAYMENT_STATUS'
export const SET_SUBTOTAL = 'SET_SUBTOTAL'

//ACTION CREATORS
export const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const setAddedProduct = product => {
  return {
    type: SET_ADDED_PRODUCT,
    product
  }
}

export const setUpdatedItemQuantity = orderProduct => {
  return {
    type: SET_UPDATED_ITEM_QUANTITY,
    orderProduct
  }
}

export const setCartWithoutRemovedItem = productId => {
  return {
    type: SET_CART_WITHOUT_REMOVED_ITEM,
    productId
  }
}

export const setPayment = status => {
  return {
    type: SET_PAYMENT_STATUS,
    status
  }
}

export const setSubtotal = () => {
  return {
    type: SET_SUBTOTAL
  }
}

export const setLoadingStatus = status => {
  return {
    type: SET_LOADING_STATUS,
    status
  }
}

export const setErrorStatus = status => {
  return {
    type: SET_ERROR_STATUS,
    status
  }
}

//THUNK CREATOR
export const fetchCart = () => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const { data: cart } = await axios.get(`/api/orders/cart`)
      dispatch(setCart(cart))
      dispatch(setSubtotal())
      dispatch(setLoadingStatus(false))
    } catch (error) {
      console.error(error)
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const addProductToCart = (id, quantity) => {
  return async dispatch => {
    try {
      const { data: addedProduct } = await axios.post(`/api/orders/cart`, {
        id,
        quantity
      })
      dispatch(setAddedProduct(addedProduct))
      dispatch(setSubtotal())
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const updateCartItemQuantity = itemInfo => {
  return async dispatch => {
    try {
      const { data: updatedItem } = await axios.put(
        `/api/orders/cart/updateItems`,
        itemInfo
      )
      dispatch(setUpdatedItemQuantity(updatedItem))
      dispatch(setSubtotal())
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const removeItemFromCart = itemInfo => {
  return async dispatch => {
    try {
      const { data: removedItemId } = await axios.delete(`/api/orders/cart`, {
        params: itemInfo
      })
      dispatch(setCartWithoutRemovedItem(removedItemId))
      dispatch(setSubtotal())
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const makePayment = paymentInfo => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/payment', paymentInfo)
      dispatch(setPayment(!!data.paid))
      await axios.put('api/orders/cart/deactivate', {
        cartId: paymentInfo.cartId
      })
      dispatch(setCart())
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  cartData: {},
  isLoading: true,
  errorHappened: false,
  paid: false,
  subtotalInPennies: 0
}

//REDUCER
const reducer = (state = initialState, action) => {
  const replaceUpdatedItemInState = () => {
    return state.cartData.products.map(product => {
      if (product.id === action.id) {
        product.orderProduct = action.product.orderProduct
        return product
      } else {
        return product
      }
    })
  }

  const addNewItemToProducts = () => {
    return [...state.cartData.products, action.product]
  }

  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cartData: action.cart
      }
    case SET_ADDED_PRODUCT:
      return {
        ...state,
        cartData: {
          ...state.cartData,
          products: state.cartData.products.filter(product => {
            return product.id === action.productId
          }).length
            ? replaceUpdatedItemInState()
            : addNewItemToProducts()
        }
      }
    //the same as SET_ADDED_PRODUCT case, may refactor to have the same case deal with both actions
    case SET_UPDATED_ITEM_QUANTITY:
      return {
        ...state,
        cartData: {
          ...state.cartData,
          products: state.cartData.products.map(product => {
            if (product.id === action.orderProduct.productId) {
              product.orderProduct = action.orderProduct
              return product
            } else {
              return product
            }
          })
        }
      }
    case SET_CART_WITHOUT_REMOVED_ITEM:
      return {
        ...state,
        cartData: {
          ...state.cartData,
          products: state.cartData.products.filter(product => {
            return product.id !== action.productId
          })
        }
      }
    case SET_SUBTOTAL:
      return {
        ...state,
        subtotal: state.cartData.products ? state.cartData.products.reduce((accum, curr) => {
          return accum + curr.price * curr.orderProduct.quantity
        }, 0) : 0
      }
    case SET_PAYMENT_STATUS:
      return {
        ...state,
        paid: action.status
      }
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status
      }
    case SET_ERROR_STATUS:
      return {
        ...state,
        errorHappened: action.status
      }
    default:
      return state
  }
}

export default reducer

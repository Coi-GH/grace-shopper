import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCT = 'GET_PRODUCT'

// ACTION CREATORS
const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

// THUNK CREATORS
export const fetchProduct = productId => {
  return async dispatch => {
    const response = await axios.get(`/api/products/${productId}`)
    const product = response.data
    dispatch(getProduct(product))
  }
}

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}

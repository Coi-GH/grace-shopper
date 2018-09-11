import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

// ACTION CREATORS
const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

// THUNK CREATORS
export const fetchAllProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    dispatch(getAllProducts(products))
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

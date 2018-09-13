import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'

// ACTION CREATORS
const setAllProducts = products => {
  return {
    type: SET_ALL_PRODUCTS,
    products
  }
}

// THUNK CREATORS
export const fetchAllProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    dispatch(setAllProducts(products))
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'
const SET_PRODUCT = 'SET_PRODUCT'

// ACTION CREATORS
const setAllProducts = products => {
  return {
    type: SET_ALL_PRODUCTS,
    products
  }
}

const setProduct = product => {
  return {
    type: SET_PRODUCT,
    product
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

export const fetchProduct = productId => {
  return async dispatch => {
    const response = await axios.get(`/api/products/${productId}`)
    const product = response.data
    dispatch(setProduct(product))
  }
}

const initialState = {
  allProducts: [],
  selectedProduct: {},
  filters: [],
  isLoading: {},
  isError: {}
}
// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products
      }
    case SET_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product
      }
    default:
      return state
  }
}

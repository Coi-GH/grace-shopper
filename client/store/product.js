import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'
const SET_PRODUCT = 'SET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'

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

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

export const setLoadingStatus = status => {
  return {
    type: SET_LOADING_STATUS,
    status
  }
}

// THUNK CREATORS
export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.get('/api/products')
      const products = response.data
      dispatch(setAllProducts(products))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.get(`/api/products/${productId}`)
      dispatch(setProduct(response.data))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const postProduct = product => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.post('/api/products', product)
      const newProduct = response.data
      dispatch(addProduct(newProduct))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const removeProduct = productId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.delete(`/api/products/${productId}`)
      const product = response.data
      console.log('deleting', product)
      dispatch(deleteProduct(product))
      dispatch(fetchAllProducts())
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const editProduct = (productId, productData) => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.put(
        `/api/products/${productId}`,
        productData
      )
      const updatedProduct = response.data
      dispatch(updateProduct(updatedProduct))
      dispatch(fetchAllProducts())
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

const initialState = {
  isLoading: true,
  allProducts: [],
  selectedProduct: {},
  selectedCategories: [],
  isError: {}
}
// REDUCER
export default function(state = initialState, action) {
  const replaceUpdatedProduct = () => {
    console.log(action)
    return state.allProducts.map(product => {
      if (product.id === action.id) {
        console.log('UPDATED!!')
        product = action.product
        return product
      } else {
        return product
      }
    })
  }

  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products
      }
    case SET_PRODUCT:
      console.log(action.product)
      return {
        ...state,
        selectedProduct: action.product,
        selectedCategories: action.product.categories
      }
    case ADD_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.product]
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          product => product.id !== action.productId
        )
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
        allProducts: state.allProducts.map(product => {
          if (product.id === action.id) {
            console.log('UPDATED!!')
            product = action.product
            return product
          } else {
            return product
          }
        })
      }
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status
      }
    default:
      return state
  }
}

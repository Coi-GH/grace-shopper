import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ALL_CATEGORIES = 'SET_ALL_CATEGORIES'
const SET_SINGLE_CATEGORY = 'SET_SINGLE_CATEGORY'
const SET_CATEGORY_ITEMS = 'SET_CATEGORY_ITEMS'
const ADD_CATEGORY = 'ADD_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const SET_PRODUCT_CATEGORIES = 'SET_PRODUCT_CATEGORIES'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'

// ACTION CREATORS
const setAllCategories = categories => {
  return {
    type: SET_ALL_CATEGORIES,
    categories
  }
}

const setSingleCategory = category => {
  return {
    type: SET_SINGLE_CATEGORY,
    category
  }
}

const setCategoryItems = items => {
  return {
    type: SET_CATEGORY_ITEMS,
    items
  }
}

const addCategory = category => {
  return {
    type: ADD_CATEGORY,
    category
  }
}

const deleteCategory = category => {
  return {
    type: DELETE_CATEGORY,
    category
  }
}

const setProductCategories = categories => {
  return {
    type: SET_PRODUCT_CATEGORIES,
    categories
  }
}

export const setLoadingStatus = status => {
  return {
    type: SET_LOADING_STATUS,
    status
  }
}

// THUNK CREATORS
export const fetchAllCategories = () => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.get('/api/categories')
      const categories = response.data
      dispatch(setAllCategories(categories))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const fetchSingleCategory = categoryId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.get(`/api/categories/${categoryId}`)
      const category = response.data
      dispatch(setSingleCategory(category))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const fetchCategoryItems = categoryId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.get(`/api/categories/${categoryId}`)
      const items = response.data
      dispatch(setCategoryItems(items))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const postCategory = category => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.post('/api/categories', category)
      const newCategory = response.data
      dispatch(addCategory(newCategory))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

export const removeCategory = categoryId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const response = await axios.delete(`/api/categories/${categoryId}`)
      const category = response.data
      dispatch(removeCategory(category))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
    }
  }
}

const initialState = {
  allCategories: [],
  currentCategory: {},
  selectedCategories: [],
  isLoading: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.categories
      }
    case SET_SINGLE_CATEGORY: {
      return {
        ...state,
        currentCategory: action.category
      }
    }
    case SET_CATEGORY_ITEMS:
      return {
        ...state,
        selectedCategories: action.items
      }
    case ADD_CATEGORY: {
      return {
        ...state,
        allCategories: [...state.allCategories, action.category]
      }
    }
    case DELETE_CATEGORY:
      return {
        ...state,
        allCategories: [
          ...state.allCategories.filter(
            category => category.id !== action.categoryId
          )
        ]
      }

    default:
      return state
  }
}

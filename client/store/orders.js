import axios from 'axios'

const SET_ALL_ORDERS = 'SET_ALL_ORDERS'
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'

const initialState = {
  allOrders: [],
  selectedOrder: {}
}

const setAllOrders = allOrders => {
  return {
    type: SET_ALL_ORDERS,
    allOrders
  }
}

const setSingleOrder = selectedOrder => {
  return {
    type: SET_SINGLE_ORDER,
    selectedOrder
  }
}

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/orders')
      dispatch(setAllOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchSingleOrder = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`)
      dispatch(setSingleOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = initialState, action) {
  const allOrders = action.allOrders
  const selectedOrder = action.selectedOrder
  switch (action.type) {
    case SET_ALL_ORDERS:
      return {...state, allOrders}
    case SET_SINGLE_ORDER:
      return {...state, selectedOrder}
    default:
      return state
  }
}

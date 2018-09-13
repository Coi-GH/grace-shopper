import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ALL_USERS = 'ALL_USERS'
const SELECTED_USER = 'SELECTED_USER'

/**
 * INITIAL STATE
 */
const initialState= {
  currentUser: {},
  allUsers: [],
  selectedUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = currentUser => ({type: GET_USER, currentUser})
const removeUser = () => ({type: REMOVE_USER})
const setAllUsers = (allUsers) => {
  return {
    type: ALL_USERS,
    allUsers
  }
}
const setSingleUser = (selectedUser) =>{
  return {
    type: SELECTED_USER,
    selectedUser
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const logInUser = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signUpUser = (firstName, lastName, email, password, billingAddress, shippingAddress) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/signup', {firstName, lastName, email, password, billingAddress, shippingAddress})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/users')
    dispatch(setAllUsers(data))
  }
}

export const fetchSingleUser = (id) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(setSingleUser(data))
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const selectedUser = action.selectedUser
  const allUsers = action.allUsers
  const currentUser = action.currentUser
  switch (action.type) {
    case GET_USER:
      return {...state, currentUser}
    case REMOVE_USER:
      return {...state, currentUser: {}}
    case ALL_USERS:
      return {...state, allUsers}
    case SELECTED_USER:
      return {...state, selectedUser}
    default:
      return state
  }
}

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['data'],
  loginSuccess: ['data'],
  loginFailure: ['message'],

  setUser: ['user'],
  logout: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  fetching: null,
  isSuccess: null,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const login = state => state.merge({ fetching: true, user: null })
export const loginSuccess = (state, { data }) => state.merge({ fetching: false, isSuccess: true, ...data })
export const loginFailure = (state, { message }) => INITIAL_STATE

export const setUser = (state, { user }) => state.merge({ user })
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,

  [Types.SET_USER]: setUser,
  [Types.LOGOUT]: logout
})

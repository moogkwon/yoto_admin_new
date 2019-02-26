import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['data'],
  loginSuccess: ['data'],
  loginFailure: ['message'],

  changePassword: ['data'],
  changePasswordSuccess: ['data'],
  changePasswordFailure: ['message'],

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
export const loginFailure = (state, { message }) => state.merge({ message })

export const changePassword = state => state.merge({ fetching: true })
export const changePasswordSuccess = (state) => state.merge({ fetching: false, isSuccess: true })
export const changePasswordFailure = (state, { message }) => state.merge({ message })

export const setUser = (state, { user }) => state.merge({ user })
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,

  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,

  [Types.SET_USER]: setUser,
  [Types.LOGOUT]: logout
})

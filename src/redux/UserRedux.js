import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUsers: ['query'],
  getUsersSuccess: ['users'],
  getUsersFailure: ['message'],

  getUser: ['userId'],
  getUserSuccess: ['user'],
  getUserFailure: ['message'],

  createUser: ['user'],
  createUserSuccess: ['user'],
  createUserFailure: ['message'],

  updateUser: ['user'],
  updateUserSuccess: ['user'],
  updateUserFailure: ['message'],

  deleteUser: ['userId'],
  deleteUserSuccess: ['user'],
  deleteUserFailure: ['message'],

  setUser: ['user']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  users: [],
  fetching: null,
  isSuccess: null,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getUsers = state => state.merge({ fetching: true })
export const getUsersSuccess = (state, { users }) => state.merge({ fetching: false, isSuccess: true, users })
export const getUsersFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const getUser = state => state.merge({ fetching: true })
export const getUserSuccess = (state, { user }) => state.merge({ fetching: false, isSuccess: true, user })
export const getUserFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const createUser = state => state.merge({ fetching: true })
export const createUserSuccess = (state, { user }) => state.merge({ fetching: false, isSuccess: true, user })
export const createUserFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const updateUser = state => state.merge({ fetching: true })
export const updateUserSuccess = (state, { user }) => state.merge({ fetching: false, isSuccess: true, user })
export const updateUserFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const deleteUser = state => state.merge({ fetching: true })
export const deleteUserSuccess = (state) => state.merge({ fetching: false, isSuccess: true, user: null })
export const deleteUserFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const setUser = (state, { user }) => state.merge({ user })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USERS]: getUsers,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,

  [Types.GET_USER]: getUser,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,

  [Types.CREATE_USER]: createUser,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,

  [Types.UPDATE_USER]: updateUser,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,

  [Types.DELETE_USER]: deleteUser,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure,

  [Types.SET_USER]: setUser
})

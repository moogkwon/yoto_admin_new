import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUsers: ['query'],
  getUsersSuccess: ['result'],
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
  deleteUserSuccess: [],
  deleteUserFailure: ['message'],

  rejectProfile: ['userId'],
  rejectProfileSuccess: ['user'],
  rejectProfileFailure: ['message'],

  blockUser: ['userId'],
  blockUserSuccess: ['user'],
  blockUserFailure: ['message'],

  unblockUser: ['userId'],
  unblockUserSuccess: ['user'],
  unblockUserFailure: ['message'],

  setUser: ['user']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  users: [],
  query: {
    where: { is_admin: { $ne: true } },
    page: 1,
    perPage: 10,
    lastPage: 1,
    total: 0
  },
  fetching: null,
  isSuccess: null,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getUsers = (state, { query }) => state.merge({ fetching: true, query })
export const getUsersSuccess = (state, { result }) => state.merge({
  fetching: false,
  isSuccess: true,
  users: result.data,
  query: {
    ...state.query,
    lastPage: result.lastPage,
    page: result.page,
    perPage: result.perPage,
    total: result.total
  }
})
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

export const rejectProfile = state => state.merge({ fetching: true })
export const rejectProfileSuccess = (state) => state.merge({ fetching: false, isSuccess: true, user: null })
export const rejectProfileFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const blockUser = state => state.merge({ fetching: true })
export const blockUserSuccess = (state) => state.merge({ fetching: false, isSuccess: true, user: null })
export const blockUserFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const unblockUser = state => state.merge({ fetching: true })
export const unblockUserSuccess = (state) => state.merge({ fetching: false, isSuccess: true, user: null })
export const unblockUserFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

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

  [Types.REJECT_PROFILE]: rejectProfile,
  [Types.REJECT_PROFILE_SUCCESS]: rejectProfileSuccess,
  [Types.REJECT_PROFILE_FAILURE]: rejectProfileFailure,

  [Types.BLOCK_USER]: blockUser,
  [Types.BLOCK_USER_SUCCESS]: blockUserSuccess,
  [Types.BLOCK_USER_FAILURE]: blockUserFailure,

  [Types.UNBLOCK_USER]: unblockUser,
  [Types.UNBLOCK_USER_SUCCESS]: unblockUserSuccess,
  [Types.UNBLOCK_USER_FAILURE]: unblockUserFailure,

  [Types.SET_USER]: setUser
})

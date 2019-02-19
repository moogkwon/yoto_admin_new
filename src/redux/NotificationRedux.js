import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNotifications: ['query'],
  getNotificationsSuccess: ['result'],
  getNotificationsFailure: ['message'],

  getNotification: ['notificationId'],
  getNotificationSuccess: ['notification'],
  getNotificationFailure: ['message'],

  createNotification: ['notification'],
  createNotificationSuccess: ['notification'],
  createNotificationFailure: ['message'],

  updateNotification: ['notification'],
  updateNotificationSuccess: ['notification'],
  updateNotificationFailure: ['message'],

  deleteNotification: ['notificationId'],
  deleteNotificationSuccess: [],
  deleteNotificationFailure: ['message']
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  notification: null,
  notifications: [],
  query: {
    where: { },
    search: '',
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
export const getNotifications = (state, { query }) => state.merge({ fetching: true, query })
export const getNotificationsSuccess = (state, { result }) => state.merge({
  fetching: false,
  isSuccess: true,
  notifications: result.data,
  query: {
    ...state.query,
    lastPage: result.lastPage,
    page: result.page,
    perPage: result.perPage,
    total: result.total
  }
})
export const getNotificationsFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const getNotification = state => state.merge({ fetching: true })
export const getNotificationSuccess = (state, { notification }) => state.merge({ fetching: false, isSuccess: true, notification })
export const getNotificationFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const createNotification = state => state.merge({ fetching: true })
export const createNotificationSuccess = (state, { notification }) => state.merge({ fetching: false, isSuccess: true, notification })
export const createNotificationFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const updateNotification = state => state.merge({ fetching: true })
export const updateNotificationSuccess = (state, { notification }) => state.merge({ fetching: false, isSuccess: true, notification })
export const updateNotificationFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const deleteNotification = state => state.merge({ fetching: true })
export const deleteNotificationSuccess = (state) => state.merge({ fetching: false, isSuccess: true, notification: null })
export const deleteNotificationFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATIONS]: getNotifications,
  [Types.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [Types.GET_NOTIFICATIONS_FAILURE]: getNotificationsFailure,

  [Types.GET_NOTIFICATION]: getNotification,
  [Types.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
  [Types.GET_NOTIFICATION_FAILURE]: getNotificationFailure,

  [Types.CREATE_NOTIFICATION]: createNotification,
  [Types.CREATE_NOTIFICATION_SUCCESS]: createNotificationSuccess,
  [Types.CREATE_NOTIFICATION_FAILURE]: createNotificationFailure,

  [Types.UPDATE_NOTIFICATION]: updateNotification,
  [Types.UPDATE_NOTIFICATION_SUCCESS]: updateNotificationSuccess,
  [Types.UPDATE_NOTIFICATION_FAILURE]: updateNotificationFailure,

  [Types.DELETE_NOTIFICATION]: deleteNotification,
  [Types.DELETE_NOTIFICATION_SUCCESS]: deleteNotificationSuccess,
  [Types.DELETE_NOTIFICATION_FAILURE]: deleteNotificationFailure
})

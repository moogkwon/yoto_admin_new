// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.apiURL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json'
    },
    // 20 second timeout...
    timeout: 20000
  })
  // api upload
  const apiUpload = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    },
    // 20 second timeout...
    timeout: 20000
  })

  api.addMonitor(response => process.env.NODE_ENV === 'development' &&
    (console.log(response.config.method, response.config.url) || console.log(response)))
  apiUpload.addMonitor(response => process.env.NODE_ENV === 'development' &&
    (console.log(response.config.method, response.config.url) || console.log(response)))

  const setToken = (token) => {
    api.setHeader('Authorization', 'Bearer ' + token)
    apiUpload.setHeader('Authorization', 'Bearer ' + token)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  // auth
  const login = (data) => api.post('/auth/login', data)
  const refreshToken = (refreshToken) => api.post('/auth/refresh', { refresh_token: refreshToken })
  // user
  const getUsers = (query) => api.get('/users', { query })
  const getUser = (id, query) => api.get(`/users/${id}`, { query })
  const deleteUser = (id) => api.delete(`/users/${id}`)
  const updateUser = (id) => api.put(`/users/${id}`)
  const rejectProfile = (id) => api.put(`/users/${id}/reject`)
  const blockUser = (id) => api.put(`/users/${id}/block`)
  const unblockUser = (id) => api.put(`/users/${id}/unblock`)
  const getUserCount = (query) => api.get('/users/count', { query })
  // report
  const getReports = (query) => api.get('/reports', { query })
  // notification
  const getNotifications = (query) => api.get('/notifications', { query })
  const createNotification = (notification) => api.post(`/notifications`, notification)
  const getNotification = (id, query) => api.get(`/notifications/${id}`, { query })
  const deleteNotification = (id) => api.delete(`/notifications/${id}`)
  const updateNotification = (id) => api.put(`/notifications/${id}`)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2setToken,
    setToken,
    // auth
    login,
    refreshToken,
    // user
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    rejectProfile,
    blockUser,
    unblockUser,
    getUserCount,
    // report
    getReports,
    // user
    getNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification
  }
}

// let's return back our create method as the default.
export default {
  create
}

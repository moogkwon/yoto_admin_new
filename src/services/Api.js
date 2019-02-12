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
  const login = (uid, password) => api.post('/auth/login', { uid, password })
  const refreshToken = (refreshToken) => api.post('/auth/refresh', { refresh_token: refreshToken })
  // patient
  // const getPatients = (query, pageIndex, pageSize, search) => api.get(`/patients`, { query, pageIndex, pageSize, search })

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
    refreshToken
    // patient
    // getPatients,
  }
}

// let's return back our create method as the default.
export default {
  create
}

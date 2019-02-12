/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import UserActions from '../redux/UserRedux'
import { getMessageError } from '../utilities/utils'

export function * getUsers (api) {
  const { token } = yield select(state => state.auth.user)
  api.setToken(token)
  // make the call to the api
  const query = {}
  const response = yield call(api.getUsers, query)
  // success?
  if (response.ok) {
    // dispatch successful getUserss
    yield put(UserActions.getUsersSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.getUsersFailure(getMessageError(response)))
  }
}

export function * getUser (api, { patientId }) {
  const { token } = yield select(state => state.auth.user)
  api.setToken(token)
  // make the call to the api
  const query = {}
  const response = yield call(api.getUser, patientId, query)
  // success?
  if (response.ok) {
    // dispatch successful getUsers
    yield put(UserActions.getUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.getUserFailure(getMessageError(response)))
  }
}

export function * createUser (api, { patient }) {
  const { token } = yield select(state => state.auth.user)
  api.setToken(token)
  // make the call to the api
  const response = yield call(api.createUser, patient)
  // success?
  if (response.ok) {
    // dispatch successful createUsers
    yield put(UserActions.createUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.createUserFailure(getMessageError(response)))
  }
}

export function * updateUser (api, { patient }) {
  const { token } = yield select(state => state.auth.user)
  api.setToken(token)
  // make the call to the api
  const response = yield call(api.updateUser, patient)
  // success?
  if (response.ok) {
    // dispatch successful updateUsers
    yield put(UserActions.updateUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.updateUserFailure(getMessageError(response)))
  }
}

export function * deleteUser (api, { patientId }) {
  const { token } = yield select(state => state.auth.user)
  api.setToken(token)
  // make the call to the api
  const response = yield call(api.deleteUser, patientId)
  // success?
  if (response.ok) {
    // dispatch successful deleteUsers
    yield put(UserActions.deleteUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.deleteUserFailure(getMessageError(response)))
  }
}

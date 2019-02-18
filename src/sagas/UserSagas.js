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
import { getMessageError, showError } from '../utilities/utils'
import { showLoading, resetLoading } from 'react-redux-loading-bar'
import { goBack, push } from 'connected-react-router'
import { getReports } from './ReportSagas'

export function * getUsers (api) {
  const query = yield select(state => state.user.query)
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.getUsers, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getUserss
    yield put(UserActions.getUsersSuccess(response.data))
  } else {
    // dispatch failure
    yield put(UserActions.getUsersFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * getUser (api, { userId }) {
  // make the call to the api
  const query = {
    with: ['reports.reportee', 'reporteds.user']
  }
  yield put(showLoading())
  const response = yield call(api.getUser, userId, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getUsers
    yield put(UserActions.getUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.getUserFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * createUser (api, { user }) {
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.createUser, user)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // yield call(getUsers, api)
    yield put(goBack())
    // dispatch successful createUsers
    yield put(UserActions.createUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.createUserFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * updateUser (api, { user }) {
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.updateUser, user)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    yield put(goBack())
    // dispatch successful updateUsers
    yield put(UserActions.updateUserSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(UserActions.updateUserFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * deleteUser (api, { userId }) {
  // make the call to the api
  const response = yield call(api.deleteUser, userId)
  // success?
  if (response.ok) {
    // dispatch successful deleteUsers
    yield put(UserActions.deleteUserSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    if (currentPath === '/users') {
      yield call(getUsers, api)
    } else {
      yield put(push('/users'))
    }
  } else {
    // dispatch failure
    yield put(UserActions.deleteUserFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * rejectProfile (api, { userId }) {
  // make the call to the api
  const response = yield call(api.rejectProfile, userId)
  // success?
  if (response.ok) {
    // dispatch successful rejectProfile
    yield put(UserActions.rejectProfileSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    if (currentPath === '/users') {
      yield call(getUsers, api)
    } else {
      yield call(getUser, api, { userId })
    }
  } else {
    // dispatch failure
    yield put(UserActions.rejectProfileFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * blockUser (api, { userId }) {
  // make the call to the api
  const response = yield call(api.blockUser, userId)
  // success?
  if (response.ok) {
    // dispatch successful blockUsers
    yield put(UserActions.blockUserSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    console.log(currentPath)
    if (currentPath === '/users') {
      yield call(getUsers, api)
    } else if (currentPath === '/reports') {
      yield call(getReports, api)
    } else {
      yield call(getUser, api, { userId })
    }
  } else {
    // dispatch failure
    yield put(UserActions.blockUserFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * unblockUser (api, { userId }) {
  // make the call to the api
  const response = yield call(api.unblockUser, userId)
  // success?
  if (response.ok) {
    // dispatch successful unblockUsers
    yield put(UserActions.unblockUserSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    if (currentPath === '/users') {
      yield call(getUsers, api)
    } else {
      yield call(getUser, api, { userId })
    }
  } else {
    // dispatch failure
    yield put(UserActions.unblockUserFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

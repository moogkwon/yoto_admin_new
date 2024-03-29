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

import { call, put } from 'redux-saga/effects'
import AuthActions from '../redux/AuthRedux'
import { getMessageError, showError, showMessage } from '../utilities/utils'
import { showLoading, resetLoading } from 'react-redux-loading-bar'
import { push } from 'connected-react-router'

export function * login (api, { data }) {
  yield put(showLoading())
  // make the call to the api
  const response = yield call(api.login, data)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    const data = response.data
    // dispatch successful logins
    yield put(AuthActions.loginSuccess({ token: data.token, refreshToken: data.refreshToken, user: data.data }))
    yield call(api.setToken, data.token)
    yield put(push('/dashboard'))
  } else {
    // dispatch failure
    yield put(AuthActions.loginFailure())
    showError(getMessageError(response))
  }
}

export function * changePassword (api, { data }) {
  yield put(showLoading())
  // make the call to the api
  const response = yield call(api.changePassword, data)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful changePasswords
    yield put(AuthActions.changePasswordSuccess())
    yield put(push('/dashboard'))
    showMessage('Password changed!!!')
  } else {
    // dispatch failure
    yield put(AuthActions.changePasswordFailure())
    showError(getMessageError(response))
  }
}

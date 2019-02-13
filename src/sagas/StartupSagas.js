import { put, select, call } from 'redux-saga/effects'
// import { is } from 'ramda'
import AuthActions from '../redux/AuthRedux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getMessageError, showError } from '../utilities/utils'
import { replace } from 'connected-react-router'

// exported to make available for tests
// export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
export function * startup (api, action) {
  const auth = yield select(state => state.auth)
  if (auth.refreshToken) {
    yield put(showLoading())
    const response = yield call(api.refreshToken, auth.refreshToken)
    yield put(hideLoading())
    if (response.ok) {
      const data = response.data
      // dispatch successful logins
      yield put(AuthActions.loginSuccess(data))
      yield call(api.setToken, data.token)
    } else {
      yield put(AuthActions.loginFailure())
      showError(getMessageError(response))
    }
  } else {
    yield put(replace('/login'))
  }
}

import { put, select, call } from 'redux-saga/effects'
// import { is } from 'ramda'
import AuthActions from '../redux/AuthRedux'
// exported to make available for tests
// export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
export function * startup (api, action) {
  const auth = yield select(state => state.auth)
  if (auth.refreshToken) {
    const response = yield call(api.refreshToken, auth.refreshToken)
    if (response.ok) {
      const data = response.data
      // dispatch successful logins
      yield put(AuthActions.loginSuccess(data))
    } else {
      yield put(AuthActions.loginFailure())
    }
  }
}

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
import NotificationActions from '../redux/NotificationRedux'
import { getMessageError, showError } from '../utilities/utils'
import { showLoading, resetLoading } from 'react-redux-loading-bar'
import { goBack, push } from 'connected-react-router'

export function * getNotifications (api) {
  const query = yield select(state => state.notification.query)
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.getNotifications, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getNotificationss
    yield put(NotificationActions.getNotificationsSuccess(response.data))
  } else {
    // dispatch failure
    yield put(NotificationActions.getNotificationsFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * getNotification (api, { notificationId }) {
  // make the call to the api
  const query = {
    with: ['reports.reportee', 'reporteds.notification']
  }
  yield put(showLoading())
  const response = yield call(api.getNotification, notificationId, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getNotifications
    yield put(NotificationActions.getNotificationSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(NotificationActions.getNotificationFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * createNotification (api, { notification }) {
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.createNotification, notification)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // yield call(getNotifications, api)
    yield put(goBack())
    // dispatch successful createNotifications
    yield put(NotificationActions.createNotificationSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(NotificationActions.createNotificationFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * updateNotification (api, { notification }) {
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.updateNotification, notification)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    yield put(goBack())
    // dispatch successful updateNotifications
    yield put(NotificationActions.updateNotificationSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(NotificationActions.updateNotificationFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * deleteNotification (api, { notificationId }) {
  // make the call to the api
  const response = yield call(api.deleteNotification, notificationId)
  // success?
  if (response.ok) {
    // dispatch successful deleteNotifications
    yield put(NotificationActions.deleteNotificationSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    if (currentPath === '/notifications') {
      yield call(getNotifications, api)
    } else {
      yield put(push('/notifications'))
    }
  } else {
    // dispatch failure
    yield put(NotificationActions.deleteNotificationFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

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
import ReportActions from '../redux/ReportRedux'
import { getMessageError, showError } from '../utilities/utils'
import { showLoading, resetLoading } from 'react-redux-loading-bar'
import { push } from 'connected-react-router'

export function * getReports (api) {
  const query = yield select(state => state.report.query.asMutable())
  query.with = ['reportee', 'user']
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.getReports, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getReportss
    yield put(ReportActions.getReportsSuccess(response.data))
  } else {
    // dispatch failure
    yield put(ReportActions.getReportsFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * getReport (api, { reportId }) {
  // make the call to the api
  const query = {
    with: ['reportee', 'user']
  }
  yield put(showLoading())
  const response = yield call(api.getReport, reportId, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getReports
    yield put(ReportActions.getReportSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(ReportActions.getReportFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * deleteReport (api, { reportId }) {
  // make the call to the api
  const response = yield call(api.deleteReport, reportId)
  // success?
  if (response.ok) {
    // dispatch successful deleteReports
    yield put(ReportActions.deleteReportSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    if (currentPath === '/reports') {
      yield call(getReports, api)
    } else {
      yield put(push('/reports'))
    }
  } else {
    // dispatch failure
    yield put(ReportActions.deleteReportFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * getMostReports (api) {
  const query = yield select(state => state.report.mostQuery)
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.getUsers, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getMostReports
    yield put(ReportActions.getMostReportsSuccess(response.data))
  } else {
    // dispatch failure
    yield put(ReportActions.getMostReportsFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

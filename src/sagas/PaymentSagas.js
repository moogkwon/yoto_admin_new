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
import PaymentActions from '../redux/PaymentRedux'
import { getMessageError, showError } from '../utilities/utils'
import { showLoading, resetLoading } from 'react-redux-loading-bar'
import { push } from 'connected-react-router'

export function * getPayments (api) {
  const query = yield select(state => state.report.query.asMutable())
  query.with = ['user']
  // make the call to the api
  yield put(showLoading())
  const response = yield call(api.getPayments, query)
  yield put(resetLoading())
  // success?
  if (response.ok) {
    // dispatch successful getPaymentss
    yield put(PaymentActions.getPaymentsSuccess(response.data))
  } else {
    // dispatch failure
    yield put(PaymentActions.getPaymentsFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

export function * deletePayment (api, { reportId }) {
  // make the call to the api
  const response = yield call(api.deletePayment, reportId)
  // success?
  if (response.ok) {
    // dispatch successful deletePayments
    yield put(PaymentActions.deletePaymentSuccess(response.data.data))
    const currentPath = yield select(state => state.router.location.pathname)
    if (currentPath === '/reports') {
      yield call(getPayments, api)
    } else {
      yield put(push('/reports'))
    }
  } else {
    // dispatch failure
    yield put(PaymentActions.deletePaymentFailure(getMessageError(response)))
    showError(getMessageError(response))
  }
}

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPayments: ['query'],
  getPaymentsSuccess: ['result'],
  getPaymentsFailure: ['message'],

  deletePayment: ['paymentId'],
  deletePaymentSuccess: [],
  deletePaymentFailure: ['message']
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payment: null,
  payments: [],
  query: {
    page: 1,
    perPage: 10,
    lastPage: 1,
    total: 0
  },
  fetching: null,
  isSuccess: null,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getPayments = (state, { query }) => state.merge({ fetching: true, query })
export const getPaymentsSuccess = (state, { result }) => state.merge({
  fetching: false,
  isSuccess: true,
  payments: result.data,
  query: {
    ...state.query,
    lastPage: result.lastPage,
    page: result.page,
    perPage: result.perPage,
    total: result.total
  }
})
export const getPaymentsFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const deletePayment = state => state.merge({ fetching: true })
export const deletePaymentSuccess = (state) => state.merge({ fetching: false, isSuccess: true, payment: null })
export const deletePaymentFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PAYMENTS]: getPayments,
  [Types.GET_PAYMENTS_SUCCESS]: getPaymentsSuccess,
  [Types.GET_PAYMENTS_FAILURE]: getPaymentsFailure,

  [Types.DELETE_PAYMENT]: deletePayment,
  [Types.DELETE_PAYMENT_SUCCESS]: deletePaymentSuccess,
  [Types.DELETE_PAYMENT_FAILURE]: deletePaymentFailure
})

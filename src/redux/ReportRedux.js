import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getReports: ['query'],
  getReportsSuccess: ['result'],
  getReportsFailure: ['message'],

  getMostReports: ['mostQuery'],
  getMostReportsSuccess: ['result'],
  getMostReportsFailure: ['message'],

  deleteReport: ['reportId'],
  deleteReportSuccess: [],
  deleteReportFailure: ['message']
})

export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  report: null,
  reports: [],
  query: {
    page: 1,
    perPage: 10,
    lastPage: 1,
    total: 0
  },
  mostQuery: {
    where: { is_blocked: { $ne: true }, reported_count: { $gt: 0 } },
    search: '',
    page: 1,
    perPage: 10,
    lastPage: 1,
    total: 0
  },
  mostReports: [],
  fetching: null,
  isSuccess: null,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getReports = (state, { query }) => state.merge({ fetching: true, query })
export const getReportsSuccess = (state, { result }) => state.merge({
  fetching: false,
  isSuccess: true,
  reports: result.data,
  query: {
    ...state.query,
    lastPage: result.lastPage,
    page: result.page,
    perPage: result.perPage,
    total: result.total
  }
})
export const getReportsFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const getMostReports = (state, { mostQuery }) => state.merge({ fetching: true, mostQuery })
export const getMostReportsSuccess = (state, { result }) => state.merge({
  fetching: false,
  isSuccess: true,
  mostReports: result.data,
  mostQuery: {
    ...state.mostQuery,
    lastPage: result.lastPage,
    page: result.page,
    perPage: result.perPage,
    total: result.total
  }
})
export const getMostReportsFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

export const deleteReport = state => state.merge({ fetching: true })
export const deleteReportSuccess = (state) => state.merge({ fetching: false, isSuccess: true, report: null })
export const deleteReportFailure = (state, { message }) => state.merge({ fetching: false, isSuccess: false, message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REPORTS]: getReports,
  [Types.GET_REPORTS_SUCCESS]: getReportsSuccess,
  [Types.GET_REPORTS_FAILURE]: getReportsFailure,

  [Types.GET_MOST_REPORTS]: getMostReports,
  [Types.GET_MOST_REPORTS_SUCCESS]: getMostReportsSuccess,
  [Types.GET_MOST_REPORTS_FAILURE]: getMostReportsFailure,

  [Types.DELETE_REPORT]: deleteReport,
  [Types.DELETE_REPORT_SUCCESS]: deleteReportSuccess,
  [Types.DELETE_REPORT_FAILURE]: deleteReportFailure
})

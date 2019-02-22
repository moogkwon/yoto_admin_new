import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/Api'
import FixtureAPI from '../services/FixtureApi'
import DebugConfig from '../config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../redux/StartupRedux'
import { AuthTypes } from '../redux/AuthRedux'
import { UserTypes } from '../redux/UserRedux'
import { ReportTypes } from '../redux/ReportRedux'
import { NotificationTypes } from '../redux/NotificationRedux'
import { PaymentTypes } from '../redux/PaymentRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './AuthSagas'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  rejectProfile,
  blockUser,
  unblockUser,
  getUserCount
} from './UserSagas'
import { getReports, getMostReports } from './ReportSagas'
import {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification
} from './NotificationSagas'
import { getPayments } from './PaymentSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),

    // some sagas receive extra parameters in addition to an action
    // auth
    takeLatest(AuthTypes.LOGIN, login, api),
    // user
    takeLatest(UserTypes.GET_USERS, getUsers, api),
    takeLatest(UserTypes.GET_USER, getUser, api),
    takeLatest(UserTypes.CREATE_USER, createUser, api),
    takeLatest(UserTypes.UPDATE_USER, updateUser, api),
    takeLatest(UserTypes.DELETE_USER, deleteUser, api),
    takeLatest(UserTypes.REJECT_PROFILE, rejectProfile, api),
    takeLatest(UserTypes.BLOCK_USER, blockUser, api),
    takeLatest(UserTypes.UNBLOCK_USER, unblockUser, api),
    takeLatest(UserTypes.GET_USER_COUNT, getUserCount, api),
    // report
    takeLatest(ReportTypes.GET_REPORTS, getReports, api),
    takeLatest(ReportTypes.GET_MOST_REPORTS, getMostReports, api),
    // notification
    takeLatest(NotificationTypes.GET_NOTIFICATIONS, getNotifications, api),
    takeLatest(NotificationTypes.GET_NOTIFICATION, getNotification, api),
    takeLatest(NotificationTypes.CREATE_NOTIFICATION, createNotification, api),
    takeLatest(NotificationTypes.UPDATE_NOTIFICATION, updateNotification, api),
    takeLatest(NotificationTypes.DELETE_NOTIFICATION, deleteNotification, api),
    // payment
    takeLatest(PaymentTypes.GET_PAYMENTS, getPayments, api)
  ])
}

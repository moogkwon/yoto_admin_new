import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../sagas/'
import ReduxPersist from '../config/ReduxPersist'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  router: connectRouter(history),
  startup: require('./StartupRedux').reducer,
  auth: require('./AuthRedux').reducer,
  user: require('./UserRedux').reducer,
  notification: require('./NotificationRedux').reducer,
  report: require('./ReportRedux').reducer,
  summary: require('./SummaryRedux').reducer,
  loadingBar: loadingBarReducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga, routerMiddleware(history))

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}

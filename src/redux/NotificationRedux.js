import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addEvent: ['event'],
  removeEvent: ['event']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  events: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const addEvent = (state, { event }) => {
  let events = [event, ...state.events.asMutable({ deep: true })]
  if (events.length > 10) {
    events.pop()
  }
  return state.merge({ events })
}

export const removeEvent = (state, { event }) => {
  let events = _.filter(state.events.asMutable(), e => e._id !== event._id)
  return state.merge({ events })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_EVENT]: addEvent,
  [Types.REMOVE_EVENT]: removeEvent
})

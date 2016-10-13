/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  HOMEPAGE_REQUEST,
  HOMEPAGE_SUCCESS,
  HOMEPAGE_FAILURE,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  collectives: false,
  sponsors: false,
  stats: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HOMEPAGE_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case HOMEPAGE_SUCCESS:
      return state
        .set('collectives', action.json.collectives)
        .set('sponsors', action.json.sponsors)
        .set('stats', action.json.stats)
        .set('loading', false);
    case HOMEPAGE_FAILURE:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default homeReducer;

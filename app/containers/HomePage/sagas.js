/**
 * Gets the homepage data
 */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { HOMEPAGE_REQUEST } from './constants';
import { homepageSuccess, homepageFailure } from './actions';

import { get } from '../../lib/api';

/**
 * homepage request/response handler
 */
export function* getHomepage() {

  const homepage = yield call(get, '/homepage');

  if (!homepage.err) {
    yield put(homepageSuccess(homepage.json));
  } else {
    yield put(homepageFailure(homepage.err));
  }
}

/**
 * Watches for HOMEPAGE_REQUEST action and calls handler
 */
export function* getHomepageWatcher() {
  while (yield take(HOMEPAGE_REQUEST)) {
    yield call(getHomepage);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* homepageData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getHomepageWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  homepageData,
];

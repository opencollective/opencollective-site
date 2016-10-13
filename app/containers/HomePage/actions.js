import {
  HOMEPAGE_REQUEST,
  HOMEPAGE_SUCCESS,
  HOMEPAGE_FAILURE,
} from './constants';

/**
 * Request homepage data, this action starts the request saga
 */
export function homepageRequest() {
  return {
    type: HOMEPAGE_REQUEST,
  };
}

/**
 * Dispatched when homepage is fetched by the request saga
 */
export function homepageSuccess(json) {
  return {
    type: HOMEPAGE_SUCCESS,
    json,
  };
}

/**
 * Dispatched when fetching homepage fails
 */
export function homepageFailure(error) {
  return {
    type: HOMEPAGE_FAILURE,
    error,
  };
}
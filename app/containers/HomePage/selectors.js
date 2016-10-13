/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectCollectives = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('collectives')
);

const selectSponsors = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('sponsors')
);

const selectStats = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('stats')
);

export {
  selectHome,
  selectCollectives,
  selectSponsors,
  selectStats
};

import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';

const roundRobinSelector = state => state.roundRobin;

export const roundsSelector = createSelector(roundRobinSelector, rounds =>
  rounds.map(round => ({
    ...round,
    pairs: flatten(round.pairs)
  }))
);

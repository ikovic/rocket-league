import shortId from 'shortid';
import robin from 'roundrobin';
import flatten from 'lodash/flatten';
import actionNames from '../../util/actionNames';

const getActionName = actionNames('roundRobin');

const initialState = [];

export const START = getActionName('START');

export default (state = initialState, action) => {
  switch (action.type) {
    case START:
      return [...state, action.round];
    default:
      return state;
  }
};

export const start = teams => {
  const pairs = flatten(robin(teams.length, teams)).map(pair => ({
    id: shortId.generate(),
    home: {
      team: pair[0],
      score: null
    },
    away: {
      team: pair[1],
      score: null
    }
  }));

  return {
    type: START,
    round: {
      id: shortId.generate(),
      pairs
    }
  };
};

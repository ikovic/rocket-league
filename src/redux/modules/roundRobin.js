import shortId from 'shortid';
import robin from 'roundrobin';
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

export const start = teams => ({
  type: START,
  round: {
    id: shortId.generate(),
    pairs: robin(teams.length, teams)
  }
});

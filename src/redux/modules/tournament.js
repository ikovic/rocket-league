import constants from '../../constants';
import actionNames from '../../util/actionNames';
import * as roundRobinActions from './roundRobin';

const getActionName = actionNames('tournament');

export const SELECT_TYPE = getActionName('SELECT_TYPE');
export const START_TOURNAMENT = getActionName('START_TOURNAMENT');

const initialState = {
  started: null,
  type: constants.TOURNAMENT_TYPE.ROUND_ROBIN
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TYPE:
      return {
        ...state,
        type: action.tournamentType
      };
    case START_TOURNAMENT:
      return {
        ...state,
        started: action.timestamp
      };
    default:
      return state;
  }
};

export const selectType = type => ({
  type: SELECT_TYPE,
  tournamentType: type
});

export const start = () => (dispatch, getState) => {
  const { tournament, teams } = getState();

  if (tournament.type === constants.TOURNAMENT_TYPE.KNOCK_OUT) {
    console.log('NYI');
  } else {
    dispatch(roundRobinActions.start(teams));
  }

  return dispatch({
    type: START_TOURNAMENT,
    timestamp: Date.now()
  });
};

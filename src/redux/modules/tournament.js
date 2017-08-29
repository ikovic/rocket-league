import shortId from 'shortid';
import isEqual from 'lodash/isEqual';
import constants from '../../constants';
import actionNames from '../../util/actionNames';
import * as roundRobinActions from './roundRobin';

const getActionName = actionNames('tournament');

export const SELECT_TYPE = getActionName('SELECT_TYPE');
export const START_TOURNAMENT = getActionName('START_TOURNAMENT');
export const LOAD_TOURNAMENT = getActionName('LOAD_TOURNAMENT');
export const NO_CHANGES = getActionName('NO_CHANGES');

const initialState = {
  id: null,
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
        started: action.started,
        id: action.id
      };
    case LOAD_TOURNAMENT:
      return action.tournament;
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
    id: shortId.generate(),
    started: Date.now()
  });
};

export const load = loadedTournament => (dispatch, getState) => {
  const { tournament, roundRobin } = getState();
  const extractedTourney = loadedTournament[Object.keys(loadedTournament)[0]];

  if (!extractedTourney) {
    return dispatch({ type: NO_CHANGES });
  }

  const tournamentMetadata = {
    id: extractedTourney.id,
    started: extractedTourney.started,
    type: extractedTourney.type
  };

  if (!isEqual(tournament, tournamentMetadata)) {
    dispatch({
      type: LOAD_TOURNAMENT,
      tournament: tournamentMetadata
    });
  }

  const emptyDraw = !extractedTourney.draw;
  const noChanges = extractedTourney.draw && isEqual(roundRobin, extractedTourney.draw);

  if (emptyDraw || noChanges) {
    return dispatch({ type: NO_CHANGES });
  }

  return dispatch(roundRobinActions.load(extractedTourney.draw));
};

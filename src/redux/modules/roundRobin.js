import shortId from 'shortid';
import robin from 'roundrobin';
import flatten from 'lodash/flatten';
import * as firebaseActions from '../../firebase';
import actionNames from '../../util/actionNames';

const getActionName = actionNames('roundRobin');

const initialState = {
  id: null,
  pairs: []
};

export const START = getActionName('START');
export const SET_SCORE = getActionName('SET_SCORE');
export const LOAD = getActionName('LOAD');

export default (state = initialState, action) => {
  switch (action.type) {
    case START:
      return action.round;
    case SET_SCORE:
      return updateScore(state, action.match);
    case LOAD:
      return action.roundRobin;
    default:
      return state;
  }
};

export const start = teams => {
  const pairs = flatten(robin(teams.length, teams)).map(pair => ({
    id: shortId.generate(),
    played: null,
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

const updateScore = (state, matchMetadata) => {
  const match = state.pairs.find(pair => pair.id === matchMetadata.id);
  const matchIndex = state.pairs.indexOf(match);

  const homeTeam = match.home;
  const awayTeam = match.away;

  const updatedMatch = {
    ...match,
    played: Date.now(),
    home: { ...homeTeam, score: Number(matchMetadata.home) },
    away: { ...awayTeam, score: Number(matchMetadata.away) }
  };

  return {
    ...state,
    pairs: [...state.pairs.slice(0, matchIndex), updatedMatch, ...state.pairs.slice(matchIndex + 1)]
  };
};

export const setScore3 = (matchId, homeScore, awayScore) => ({
  type: SET_SCORE,
  match: {
    id: matchId,
    home: homeScore,
    away: awayScore
  }
});

export const setScore = (matchId, homeScore, awayScore) => (dispatch, getState) => {
  dispatch({
    type: SET_SCORE,
    match: {
      id: matchId,
      home: homeScore,
      away: awayScore
    }
  });

  const { tournament, roundRobin } = getState();

  firebaseActions.saveTournament({ ...tournament, draw: roundRobin });

  return dispatch({
    type: 'FIREBASE_SAVE'
  });
};

export const load = roundRobin => ({
  type: LOAD,
  roundRobin
});

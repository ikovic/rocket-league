import shortId from 'shortid';
import robin from 'roundrobin';
import flatten from 'lodash/flatten';
import actionNames from '../../util/actionNames';

const getActionName = actionNames('roundRobin');

const initialState = {};

export const START = getActionName('START');
export const SET_SCORE = getActionName('SET_SCORE');

export default (state = initialState, action) => {
  switch (action.type) {
    case START:
      return action.round;
    case SET_SCORE:
      return updateScore(state, action.match);
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
    home: { ...homeTeam, score: matchMetadata.home },
    away: { ...awayTeam, score: matchMetadata.away }
  };

  return {
    ...state,
    pairs: [
      ...state.pairs.slice(0, matchIndex),
      updatedMatch,
      ...state.pairs.slice(matchIndex + 1)
    ]
  };
};

export const setScore = (matchId, homeScore, awayScore) => ({
  type: SET_SCORE,
  match: {
    id: matchId,
    home: homeScore,
    away: awayScore
  }
});

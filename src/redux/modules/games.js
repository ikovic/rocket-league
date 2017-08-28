import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import shortId from 'shortid';
import actionNames from '../../util/actionNames';

const court = {
  name: 'SeekandHit',
  venue: {
    name: 'GameRoom'
  }
};

const getActionName = actionNames('games');

const initialState = [];

export const START = getActionName('START');

export default (state = initialState, action) => {
  switch (action.type) {
    case START:
      return action.games;
    default:
      return state;
  }
};

const createGame = pair => {
  const id = shortId.generate();
  return {
    id,
    name: id,
    bracketLabel: 'R1',
    scheduled: Date.now(),
    court,
    pair
  };
};

export const start = () => (dispatch, getState) => {
  const teams = getState().teams;

  const randomTeams = shuffle(teams);
  const pairedTeams = chunk(randomTeams, 2);
  const games = pairedTeams.map(pair => createGame(pair));

  return dispatch({
    type: START,
    games
  });
};

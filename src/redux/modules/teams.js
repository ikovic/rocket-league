import shortId from 'shortid';
import actionNames from '../../util/actionNames';
import * as firebaseActions from '../../firebase';

const getActionName = actionNames('teams');

const initialState = [];

export const LOAD_TEAMS = getActionName('LOAD_TEAMS');
export const ADD_TEAM = getActionName('ADD_TEAM');
export const REMOVE_TEAM = getActionName('REMOVE_TEAM');

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEAMS:
      return Object.keys(action.teams).map(key => action.teams[key]);
    case ADD_TEAM:
      return [...state, action.team];
    case REMOVE_TEAM:
      return state.filter(team => team.id !== action.id);
    default:
      return state;
  }
};

export const addTeam = name => dispatch => {
  const team = {
    id: shortId.generate(),
    name
  };

  firebaseActions.addTeam(team);

  return dispatch({
    type: ADD_TEAM,
    team: {
      id: shortId.generate(),
      name
    }
  });
};

export const removeTeam = id => ({
  type: REMOVE_TEAM,
  id
});

export const loadTeams = teams => ({
  type: LOAD_TEAMS,
  teams
});

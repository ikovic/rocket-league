import shortId from 'shortid';
import actionNames from '../../util/actionNames';

const getActionName = actionNames('teams');

const initialState = [];

export const ADD_TEAM = getActionName('ADD_TEAM');
export const REMOVE_TEAM = getActionName('REMOVE_TEAM');

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM:
      return [...state, action.team];
    case REMOVE_TEAM:
      return state.filter(team => team.id !== action.id);
    default:
      return state;
  }
};

export const addTeam = name => ({
  type: ADD_TEAM,
  team: {
    id: shortId.generate(),
    name
  }
});

export const removeTeam = id => ({
  type: REMOVE_TEAM,
  id
});

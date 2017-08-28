import shortId from 'shortid';
import constants from '../../constants';
import actionNames from '../../util/actionNames';

const getActionName = actionNames('tournament');

export const SELECT_TYPE = getActionName('SELECT_TYPE');

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
    default:
      return state;
  }
};

export const selectType = type => ({
  type: SELECT_TYPE,
  tournamentType: type
});

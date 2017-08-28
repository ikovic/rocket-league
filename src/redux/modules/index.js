import { combineReducers } from 'redux';
import games from './games';
import teams from './teams';
import tournament from './tournament';
import roundRobin from './roundRobin';

export default combineReducers({
  games,
  teams,
  tournament,
  roundRobin
});

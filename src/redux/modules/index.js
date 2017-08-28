import { combineReducers } from 'redux';
import games from './games';
import teams from './teams';
import tournament from './tournament';

export default combineReducers({
  games,
  teams,
  tournament
});
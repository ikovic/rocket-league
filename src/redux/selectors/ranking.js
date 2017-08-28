import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';
import constants from '../../constants';

const finishedMatchesSelector = state => state.roundRobin.pairs.filter(pair => pair.played);
const teamsSelector = state => state.teams;

const findSetsWon = (teamId, matches) => {
  let setsWon = 0;
  matches.forEach(match => {
    const isHome = match.home.team.id === teamId;
    const isAway = match.away.team.id === teamId;
    if (isHome || isAway) {
      if (isHome) {
        setsWon += Number(match.home.score);
      } else {
        setsWon += Number(match.away.score);
      }
    }
  });

  return setsWon;
};

const findSetsLost = (teamId, matches) => {
  let setsLost = 0;
  matches.forEach(match => {
    const isHome = match.home.team.id === teamId;
    const isAway = match.away.team.id === teamId;
    if (isHome || isAway) {
      if (isHome) {
        setsLost += Number(match.away.score);
      } else {
        setsLost += Number(match.home.score);
      }
    }
  });

  return setsLost;
};

const findGamesWon = (teamId, matches) =>
  matches.filter(
    match =>
      (match.home.team.id === teamId &&
        Number(match.home.score) === constants.SETS_TO_WIN) ||
      (match.away.team.id === teamId &&
        Number(match.away.score) === constants.SETS_TO_WIN)
  ).length;

const findGamesPlayed = (teamId, matches) =>
  matches.filter(
    match => match.home.team.id === teamId || match.away.team.id === teamId
  ).length;

export const getRoundRobinRanking = createSelector(
  teamsSelector,
  finishedMatchesSelector,
  (teams, matches) =>
    orderBy(
      teams.map(team => {
        const won = findGamesWon(team.id, matches);
        const rounds = findGamesPlayed(team.id, matches);
        const lost = rounds - won;

        return {
          ...team,
          setsWon: findSetsWon(team.id, matches),
          setsLost: findSetsLost(team.id, matches),
          won,
          lost,
          rounds
        };
      }),
      ['won'],
      ['desc']
    )
);

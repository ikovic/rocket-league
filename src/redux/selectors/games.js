import { createSelector } from 'reselect';
import shortId from 'shortid';

const teamsSelector = state => state.teams;
const gamesSelector = state => state.games;

const free = {
  score: { score: 0 },
  team: {
    id: shortId.generate(),
    name: 'free'
  }
};

const createSide = team => ({
  score: {
    score: 0
  },
  seed: null,
  team
});

export const tournamentSelector = createSelector(
  teamsSelector,
  gamesSelector,
  (teams, games) =>
    games.map(game => {
      if (game.pair.length === 1) {
        return {
          ...game,
          sides: {
            home: createSide(teams.find(team => team.id === game.pair[0].id)),
            visitor: free
          }
        };
      }

      return {
        ...game,
        sides: {
          home: createSide(teams.find(team => team.id === game.pair[0].id)),
          visitor: createSide(teams.find(team => team.id === game.pair[1].id))
        }
      };
    })
);

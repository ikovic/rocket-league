import React, { PureComponent } from 'react';

export default class Ranking extends PureComponent {
  render() {
    const ranking = this.props.ranking;

    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tim</th>
            <th>W</th>
            <th>L</th>
            <th>W Set</th>
            <th>L Set</th>
            <th>Kola</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((team, idx) =>
            <tr key={team.id}>
              <td>
                {idx + 1}
              </td>
              <td>
                {team.name}
              </td>
              <td>
                {team.won}
              </td>
              <td>
                {team.lost}
              </td>
              <td>
                {team.setsWon}
              </td>
              <td>
                {team.setsLost}
              </td>
              <td>
                {team.rounds}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

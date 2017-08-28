import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class RoundRobin extends PureComponent {
  renderPairs(round) {
    return round.pairs.map(pair => {
      const { home, away, id } = pair;

      return (
        <li key={id}>
          {home.team.name} VS {away.team.name}
        </li>
      );
    });
  }

  renderRounds() {
    const rounds = this.props.rounds;

    return (
      <li>
        {rounds.map(round =>
          <ul key={round.id}>
            {this.renderPairs(round)}
          </ul>
        )}
      </li>
    );
  }

  render() {
    return (
      <ul>
        {this.renderRounds()}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  rounds: state.roundRobin
});

export default connect(mapStateToProps)(RoundRobin);

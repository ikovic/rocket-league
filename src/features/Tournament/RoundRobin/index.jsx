import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { roundsSelector } from '../../../redux/selectors/roundRobin';

class RoundRobin extends PureComponent {
  renderPairs(round) {
    console.log(round);
    return round.pairs.map((pair, idx) =>
      <li key={idx}>
        {pair[0].name} VS {pair[1].name}
      </li>
    );
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
  rounds: roundsSelector(state)
});

export default connect(mapStateToProps)(RoundRobin);

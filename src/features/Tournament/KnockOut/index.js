import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BracketGenerator } from 'react-tournament-bracket';
import { tournamentSelector } from '../../../redux/selectors/games';

class KnockOut extends PureComponent {
  render() {
    return <BracketGenerator games={this.props.games} />;
  }
}

const mapStateToProps = state => ({
  games: tournamentSelector(state)
});

export default connect(mapStateToProps)(KnockOut);

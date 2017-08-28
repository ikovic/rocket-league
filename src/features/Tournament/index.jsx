import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BracketGenerator } from 'react-tournament-bracket';
import * as gamesActions from '../../redux/modules/games';
import { tournamentSelector } from '../../redux/selectors/games';

const StartButton = ({ onClick }) =>
  <button onClick={onClick}>START TOURNAMENT</button>;

const ProceedButton = () => <button>PROCEED</button>;

class Tournament extends PureComponent {
  render() {
    const games = this.props.games;

    return (
      <div>
        {games.length
          ? <ProceedButton />
          : <StartButton onClick={this.props.start} />}
        <BracketGenerator games={games} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: tournamentSelector(state)
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(gamesActions.start())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);

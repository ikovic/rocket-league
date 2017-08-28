import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RoundRobin from './RoundRobin';
import KnockOut from './KnockOut';
import * as gamesActions from '../../redux/modules/games';
import * as tournamentActions from '../../redux/modules/tournament';
import constants from '../../constants';

const StartButton = ({ onClick }) =>
  <button onClick={onClick}>START TOURNAMENT</button>;

const ProceedButton = () => <button>PROCEED</button>;

const TypeSelect = ({ type, onChange }) =>
  <select value={type} onChange={event => onChange(event.target.value)}>
    {Object.keys(constants.TOURNAMENT_TYPE).map(tournamentType =>
      <option
        key={tournamentType}
        value={constants.TOURNAMENT_TYPE[tournamentType]}
      >
        {constants.TOURNAMENT_TYPE[tournamentType]}
      </option>
    )}
  </select>;

class Tournament extends PureComponent {
  onTypeChange = type => this.props.selectType(type);

  render() {
    const tournament = this.props.tournament;

    return (
      <div>
        {tournament.started
          ? <ProceedButton />
          : <span>
              <TypeSelect type={tournament.type} onChange={this.onTypeChange} />
              <StartButton onClick={this.props.start} />
            </span>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournament: state.tournament
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(gamesActions.start()),
  selectType: type => dispatch(tournamentActions.selectType(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);

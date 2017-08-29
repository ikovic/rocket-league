import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RoundRobin from './RoundRobin';
import KnockOut from './KnockOut';
import * as tournamentActions from '../../redux/modules/tournament';
import constants from '../../constants';

const StartButton = ({ onClick }) =>
  <button onClick={onClick}>START TOURNAMENT</button>;

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

  renderTournament = () =>
    this.props.tournament === constants.TOURNAMENT_TYPE.KNOCK_OUT
      ? <KnockOut />
      : <RoundRobin />;

  render() {
    const tournament = this.props.tournament;

    return (
      <div>
        <h3>Tournament</h3>
        {tournament.started
          ? this.renderTournament()
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
  start: () => dispatch(tournamentActions.start()),
  selectType: type => dispatch(tournamentActions.selectType(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);

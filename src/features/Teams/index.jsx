import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import AddTeam from './AddTeam';

class Teams extends PureComponent {
  render() {
    const { teams, tournament } = this.props;

    return (
      <div>
        <h3>Teams</h3>
        {tournament.started ? null : <AddTeam />}
        <TeamList readOnly={tournament.started} teams={teams} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
  tournament: state.tournament
});

export default connect(mapStateToProps)(Teams);

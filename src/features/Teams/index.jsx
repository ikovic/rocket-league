import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import AddTeam from './AddTeam';

class Teams extends PureComponent {
  render() {
    return (
      <div>
        <h3>Teams</h3>
        <AddTeam />
        <TeamList teams={this.props.teams} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams
});

export default connect(mapStateToProps)(Teams);

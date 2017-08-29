import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as teamsActions from '../redux/modules/teams';
import * as tournamentActions from '../redux/modules/tournament';

const withFirebase = firebase => WrappedComponent => {
  class WithFirebase extends PureComponent {
    componentDidMount() {
      const { loadTeams, loadTournament } = this.props;
      const teamsRef = firebase.database().ref('teams');
      const tournamentRef = firebase.database().ref('tournaments');

      teamsRef.on('value', snapshot => loadTeams(snapshot.val()));
      tournamentRef.on('value', snapshot => loadTournament(snapshot.val()));
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    loadTeams: teams => dispatch(teamsActions.loadTeams(teams)),
    loadTournament: tournament => dispatch(tournamentActions.load(tournament))
  });

  return connect(null, mapDispatchToProps)(WithFirebase);
};

export default withFirebase;

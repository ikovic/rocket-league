import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as teamsActions from '../redux/modules/teams';

const withFirebase = firebase => WrappedComponent => {
  class WithFirebase extends PureComponent {
    componentDidMount() {
      const teamsRef = firebase.database().ref('teams');

      teamsRef.on('value', snapshot => {
        this.props.loadTeams(snapshot.val());
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    loadTeams: teams => dispatch(teamsActions.loadTeams(teams)),
    loadTournament: () => dispatch()
  });

  return connect(null, mapDispatchToProps)(WithFirebase);
};

export default withFirebase;

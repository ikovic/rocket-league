import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as teamsActions from '../../redux/modules/teams';

const TeamItem = ({ team, onDelete }) =>
  <li>
    {team.name}
    <button onClick={() => onDelete(team.id)}>-</button>
  </li>;

class TeamList extends PureComponent {
  handleDeleteClick = id => this.props.removeTeam(id);

  render() {
    return (
      <ul>
        {this.props.teams.map(team =>
          <TeamItem key={team.id} team={team} onDelete={this.handleDeleteClick} />
        )}
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeTeam: id => dispatch(teamsActions.removeTeam(id))
});

export default connect(null, mapDispatchToProps)(TeamList);

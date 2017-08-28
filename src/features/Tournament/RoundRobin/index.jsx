import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as roundRobinActions from '../../../redux/modules/roundRobin';
import Score from '../../../components/Score';

class RoundRobin extends PureComponent {
  state = {
    scoreEditorVisible: false,
    match: null
  };

  showScoreEditor = match => {
    this.setState({ scoreEditorVisible: true, match });
  };

  onScoreSave = ({ matchId, home, away }) => {
    // dispatch action to save score
    this.props.setScore(matchId, home, away);

    this.setState({
      scoreEditorVisible: false,
      match: null
    });
  };

  renderPairs() {
    return this.props.robin.pairs.map(pair => {
      const { home, away, id } = pair;

      return (
        <li key={id} onClick={() => this.showScoreEditor(pair)}>
          {home.team.name} VS {away.team.name} {home.score}:{away.score}
        </li>
      );
    });
  }

  render() {
    const { match, scoreEditorVisible } = this.state;

    return (
      <div>
        {scoreEditorVisible
          ? <Score match={match} onSave={this.onScoreSave} />
          : null}
        <ul>
          {this.renderPairs()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  robin: state.roundRobin
});

const mapDispatchToProps = dispatch => ({
  setScore: (matchId, home, away) =>
    dispatch(roundRobinActions.setScore(matchId, home, away))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundRobin);

import React, { PureComponent } from 'react';

export default class Score extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      home: props.match.home.score || 0,
      away: props.match.away.score || 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      this.setState({
        home: nextProps.match.home.score || 0,
        away: nextProps.match.away.score || 0
      });
    }
  }

  updateScore = (score, name) => {
    this.setState({ [name]: score });
  };

  render() {
    const { home, away } = this.state;
    const { match, onSave } = this.props;

    return (
      <span>
        <label htmlFor="home">
          {match.home.team.name}
        </label>
        <input
          type="number"
          id="home"
          value={home}
          onChange={e => this.updateScore(e.target.value, 'home')}
        />
        <label htmlFor="away">
          {match.away.team.name}
        </label>
        <input
          type="number"
          id="away"
          value={away}
          onChange={e => this.updateScore(e.target.value, 'away')}
        />
        <button onClick={() => onSave({ matchId: match.id, home, away })}>
          OK
        </button>
      </span>
    );
  }
}

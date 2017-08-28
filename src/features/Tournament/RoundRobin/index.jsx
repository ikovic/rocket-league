import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class RoundRobin extends PureComponent {
  render() {
    console.dir(this.props.rounds);
    return <h1>ROUND ROBIN</h1>;
  }
}

const mapStateToProps = state => ({
  rounds: state.roundRobin
});

export default connect(mapStateToProps)(RoundRobin);

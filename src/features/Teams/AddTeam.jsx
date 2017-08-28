import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as teamsActions from '../../redux/modules/teams';

const Input = ({ name, onChange, onConfirm }) =>
  <span>
    <input type="text" onChange={e => onChange(e.target.value)} value={name} />
    <button onClick={onConfirm}>OK</button>
  </span>;

const AddButton = ({ onClick }) => <button onClick={onClick}>+</button>;

class AddTeam extends PureComponent {
  state = {
    inputVisible: false,
    name: ''
  };

  handleNameChange = name => this.setState({ name });

  handleAddClick = () => this.setState({ inputVisible: true });

  handleSaveClick = () => {
    this.props.addTeam(this.state.name);
    this.setState({ name: '', inputVisible: false });
  };

  render() {
    const { inputVisible, name } = this.state;

    return (
      <div>
        {inputVisible
          ? <Input
              name={name}
              onChange={this.handleNameChange}
              onConfirm={this.handleSaveClick}
            />
          : <AddButton onClick={this.handleAddClick} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTeam: name => dispatch(teamsActions.addTeam(name))
});

export default connect(null, mapDispatchToProps)(AddTeam);

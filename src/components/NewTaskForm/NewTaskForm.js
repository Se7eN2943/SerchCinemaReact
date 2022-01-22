import React, { Component } from 'react';
import PropTypes from 'prop-types';

function AppHeader() {
  return <h1>ToDoes</h1>;
}
export default class NewTaskForm extends Component {
  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: PropTypes.func,
  };

  state = {
    label: '',
  };

  changeSub = (event) => {
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({ label: '' });
  };

  render() {
    return (
      <div>
        <header className="header">
          <AppHeader />
          <form onSubmit={this.onSubmit}>
            <input
              value={this.state.label}
              type="text"
              onChange={this.changeSub}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>
      </div>
    );
  }
}
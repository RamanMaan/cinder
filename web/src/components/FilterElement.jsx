import React from 'react';

import './styles/FilterElement.css';

export default class FilterElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: !this.props.checked
    };
  }

  toggle() {
    this.props.onChange(this.state.disabled);
    this.setState(prevState => {
      return { disabled: !prevState.disabled };
    });
  }

  renderSwitch() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={() => this.toggle()}
        />
        <div className={`slider ${this.props.round ? 'round' : ''}`} />
      </label>
    );
  }

  render() {
    return (
      <div
        className={`filter element ${this.state.disabled ? 'disabled' : ''}`}
      >
        <div className="toggle">{this.renderSwitch()}</div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

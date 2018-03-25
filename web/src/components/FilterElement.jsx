import React from 'react';

import './styles/FilterElement.css';

export default class FilterElement extends React.Component {
  _renderSwitch() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <div className={`slider ${this.props.round ? 'round' : ''}`} />
      </label>
    );
  }

  render() {
    return (
      <div className="filter element">
        <div className="toggle">{this._renderSwitch()}</div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

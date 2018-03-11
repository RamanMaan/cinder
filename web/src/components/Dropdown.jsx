import React from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import './styles/Dropdown.css';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      value: []
    };
  }

  onChange(value) {
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }

  fetchData() {
    return fetch(this.props.endpoint)
      .then(res => res.json())
      .then(json => ({
        options: json.map(x => ({ value: x.id, label: x.value }))
      }));
  }

  render() {
    return (
      <div>
        <Select.Async
          loadOptions={this.fetchData}
          multi={true}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

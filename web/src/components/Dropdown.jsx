import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles/Dropdown.css';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    return fetch(this.props.endpoint, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
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
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

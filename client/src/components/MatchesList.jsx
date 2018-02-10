import React, { Component } from 'react';
import './styles/MatchesList.css';

import MatchesListItem from '../components/MatchesListItem';

class MatchesList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const listItems = this.props.matches.map(
      ({ title, subtitle, img, date }) => (
        <MatchesListItem
          title={title}
          subtitle={subtitle}
          img={img}
          date={date}
        />
      )
    );
    return (
      <div className="MatchesList">
        <h1>This is the MatchesList page</h1>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default MatchesList;

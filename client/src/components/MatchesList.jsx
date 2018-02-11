import React, { Component } from 'react';
import './styles/MatchesList.css';

import MatchesListItem from '../components/MatchesListItem';

class MatchesList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.matches || !this.props.matches.length) {
      return (
        <div className="MatchesList">
          <div className="empty">
            <h3 className="msg align-self-center">
              No matches yet. Get swiping!
            </h3>
          </div>
        </div>
      );
    }

    const listItems = this.props.matches.map(
      ({ id, title, subtitle, img, date }) => (
        <MatchesListItem
          key={id}
          title={title}
          subtitle={subtitle}
          img={img}
          date={date}
        />
      )
    );

    return (
      <div className="MatchesList">
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default MatchesList;

import React, { Component } from 'react';
import './styles/MatchesList.css';

import MatchesListItem from '../components/MatchesListItem';

class MatchesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  onListItemClick(id) {
    this.setState({ active: id });
    this.props.clickHandler(id);
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
          active={id === this.state.active}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={this.onListItemClick.bind(this, id)}
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

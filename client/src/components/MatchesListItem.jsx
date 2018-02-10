import React from 'react';
import './styles/MatchesListItem.css';

const MatchesListItem = props => (
  <div className="MatchesListItem">
    <h1>This is the MatchesListItem page</h1>
    <ul>{props.name}</ul>
  </div>
);

export default MatchesListItem;

import React from 'react';
import './styles/MatchesListItem.css';

const dateFormat = date => new Date(date).toJSON().split('T')[0];

const MatchesListItem = ({ title, subtitle, date, img }) => (
  <div className="MatchesListItem">
    <div className="img-container">
      <img className="circular" src={img} alt="" />
    </div>
    <div className="details">
      <div className="top">
        <div className="left">
          <span className="title">{title}</span>
        </div>
        <div className="right">
          <span className="date">{dateFormat(date)}</span>
        </div>
      </div>
      <div className="bottom">
        <span className="subtitle">{subtitle}</span>
      </div>
    </div>
  </div>
);

export default MatchesListItem;

import React from 'react';
import { Button } from 'reactstrap';

import './styles/UserDetail.css';

class UserDetail extends React.Component {
  formatMatchDate() {
    return new Date(this.props.matchDate).toISOString().split('T')[0];
  }

  render() {
    const backButtonComponent = this.props.backButton ? (
      <Button
        outline
        color="primary"
      >Back to finding love</Button>
    ) : null;

    const contactComponent = this.props.matchDate ? (
      <p className="contact detail">{'Phone: 111-222-3333'}</p>
    ) : null;

    const matchDateComponent = this.props.matchDate ? (
      <div className="matchDate">
        <p>{this.props.matchDate ? this.formatMatchDate() : 'A lifetime ago.'}</p>
      </div>
    ) : null;

    const matchBtns = this.props.matchBtns ? (
      <div className="matchButtons">
        <Button
          className="not"
          color="danger"
          size="lg"
          onClick={this.props.matchBtns.handlePass}
        > NOT </Button>
        <Button
          className="hot"
          color="success"
          size="lg"
          onClick={this.props.matchBtns.handleLike}
        > HOT </Button>
      </div>
    ) : null;

    return (
      <div className="UserDetail">
        {backButtonComponent}

        <img
          src={this.props.img}
          alt=""
        />
        <div className="header">
          <h2 className="name">{this.props.name}</h2>
          <h2 className="age">{this.props.age}</h2>
        </div>

        <div className="details">
          <p className="bio detail">{this.props.bio}</p>
          {contactComponent}
        </div>

        {matchBtns}

        {matchDateComponent}
      </div>
    );
  }
}

export default UserDetail;

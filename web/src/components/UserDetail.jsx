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
        onClick={this.props.backButton}
      >Back to finding love</Button>
    ) : null;

    const contactComponent = this.props.matchDate ? (
      <div>
        <div className="divider">
          <p>Contact Info</p>
        </div>
        <p className="contact detail">{'Phone: 111-222-3333'}</p>
      </div>
    ) : null;

    const matchDateComponent = this.props.matchDate ? (
      <div className="matchDate">
        <p>{this.props.matchDate ? this.formatMatchDate() : 'A lifetime ago.'}</p>
      </div>
    ) : null;

    const matchBtns = this.props.matchBtns ? (
      <div className="matchBtns">
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
      <div className="UserDetail container">
        <div className="back">
          {backButtonComponent}
        </div>

        <div className="image">
          <img
            src={this.props.img}
            alt=""
          />
        </div>

        <div className="header">
          <h2 >{`${this.props.name}, ${this.props.age}`}</h2>
        </div>

        <div className="details">
          <div className="divider">
            <p>User Bio</p>
          </div>
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

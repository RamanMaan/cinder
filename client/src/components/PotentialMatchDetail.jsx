import React from 'react';
import './styles/PotentialMatchDetail.css';

export default class PotentialMatchDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.potentialMatchDetail) {
      return (
        <div className="UserDetailEmpty">
          <div className="empty">
            <h3 className="msg align-self-center">
              There's no one new around you.
            </h3>
          </div>
        </div>
      );
    }

    return (
      <div className="UserDetail">
        <img className="userImage" src={this.props.potentialMatchDetail.img} />
        <br />
        <div className="UserInfo">
          <span className="UserNameAndAge">
            {this.props.potentialMatchDetail.title},{' '}
            {this.props.potentialMatchDetail.age}
          </span>
          <br />
          <span className="UserBio">
            {this.props.potentialMatchDetail.subtitle}
          </span>
        </div>
      </div>
    );
  }
}

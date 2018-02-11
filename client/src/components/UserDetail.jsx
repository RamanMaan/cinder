import React, { Component } from 'react';

import './styles/UserDetail.css';

export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genderPic: this.getGenderPic()
    };
  }

  getGenderPic() {
    if (this.props.userDetail.userGender == 'Male')
      return 'https://image.freepik.com/free-icon/male-gender-symbol_318-32483.jpg';
    else if (this.props.userDetail.userGender == 'Female')
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqMOagH0yYRUxgDxkRXl_oO9pH_ADsYLmOQ-lhrLlEZCmG4EjG4g';
    else return 'https://image.flaticon.com/icons/svg/14/14869.svg';
  }

  render() {
    return (
      <div className="UserDetail">
        <img className="userImage" src={this.props.userDetail.userPics} />
        <h2>{this.props.userDetail.userName}</h2>
        <div className="userAgeWithGender">
          <span className="userAge">{this.props.userDetail.userAge}</span>
          <img className="userGender" src={this.state.genderPic} />
        </div>
        <div>
          <p>
            Matched: {this.props.userDetail.matchTime.toLocaleDateString()}{' '}
            {this.props.userDetail.matchTime.toLocaleTimeString()}
          </p>
        </div>
        <div>
          <p>Bio: {this.props.userDetail.userBio}</p>
        </div>

        <div>
          <p>Note: {this.props.userDetail.matchNote}</p>
        </div>
      </div>
    );
  }
}

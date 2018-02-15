import React from 'react';

import './styles/UserDetail.css';
import genderMale from '../assets/gender-male.svg';
import genderFemale from '../assets/gender-female.svg';
import genderOther from '../assets/gender-other.svg';

class UserDetail extends React.Component {
  getGenderPic() {
    if (!this.props.userDetail || !this.props.userDetail.userName) {
      return;
    }
    if (this.props.userDetail.userGender === 'Male') return genderMale;
    else if (this.props.userDetail.userGender === 'Female') return genderFemale;
    else return genderOther;
  }

  dateFormat() {
    return (
      this.props.userDetail.matchTime.toLocaleDateString() +
      ' ' +
      this.props.userDetail.matchTime.toLocaleTimeString()
    );
  }

  render() {
    if (!this.props.userDetail || !this.props.userDetail.userName) {
      return (
        <div className="UserDetail">
          <div className="empty">
            <h3 className="msg align-self-center">
              No match selected yet. Select one match from the list!
            </h3>
          </div>
        </div>
      );
    }

    return (
      <div className="UserDetail">
        <img
          className="userImage"
          src={this.props.userDetail.userPics}
          alt=""
        />
        <h2>{this.props.userDetail.userName}</h2>
        <div className="userAgeWithGender">
          <span className="userAge">{this.props.userDetail.userAge}</span>
          <img className="userGender" src={this.getGenderPic()} alt="" />
        </div>
        <div>
          <p>
            <span className="titleStyle">Matched:</span>{' '}
            <span>
              {this.props.userDetail.matchTime ? this.dateFormat() : 'Unkown'}{' '}
            </span>
          </p>
        </div>
        <div>
          <span className="titleStyle">Bio:</span>{' '}
          <p className="textAutoWrap">{this.props.userDetail.userBio}</p>
        </div>
      </div>
    );
  }
}

export default UserDetail;

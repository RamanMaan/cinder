import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProfile } from '../actions';
import Home from './Home';
import Navbar from '../components/NavigationBar';
import Profile from './Profile';

import './styles/Layout.css';

class Layout extends Component {
  componentDidMount() {
    this.props.fetchUserData(this.props.userID, this.props.token);
  }

  render() {
    return (
      <div className="LayoutContent">
        <Navbar
          userIcon={this.props.profile.primaryPic}
          userName={this.props.profile.userName}
        />
        <Profile userInfo={this.props.profile} />
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID,
  token: state.auth.token,
  profile: state.profile.details
});

const mapDispatchToProps = dispatch => ({
  fetchUserData: (userID, token) => dispatch(fetchProfile(userID, token))
});

Layout.propTypes = {
  fetchUserData: PropTypes.func.isRequired,

  userID: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,

  profile: PropTypes.shape({
    userID: PropTypes.number,
    userName: PropTypes.string,
    userBirthday: PropTypes.string,
    userBio: PropTypes.string,
    primaryPic: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

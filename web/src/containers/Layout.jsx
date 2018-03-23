import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions';
import Home from './Home';
import Navbar from '../components/NavigationBar';
import Profile from './Profile';

import './styles/Layout.css';

class Layout extends Component {
  componentDidMount() {
    this.props.fetchUserInfo(this.props.userID, this.props.token);
  }

  render() {
    return (
      <div className="LayoutContent">
        <Navbar
          userIcon={this.props.userInfo.primaryPic}
          userName={this.props.userInfo.userName}
        />
        <Profile userInfo={this.props.userInfo} />
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID,
  token: state.auth.token,
  userInfo: state.userInfo.userInfo
});

const mapDispatchToProps = dispatch => ({
  fetchUserInfo: (userID, token) => dispatch(fetchUserInfo(userID, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

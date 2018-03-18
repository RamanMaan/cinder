import React, { Component } from 'react';

import Auth from '../utils/authService';
import Home from './Home';
import Navbar from '../components/NavigationBar';
import Profile from './Profile';

import './styles/Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.fetchLoggedInUserDetails = this.fetchLoggedInUserDetails.bind(this);

    this.state = {
      loggedInUserDetail: false
    };
  }

  fetchLoggedInUserDetails() {
    fetch(`/api/users/${Auth.userID}`, {
      headers: { Authorization: `Bearer ${Auth.token}` }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          loggedInUserDetail: {
            userName: res.userName,
            primaryPic: res.primaryPic
          }
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchLoggedInUserDetails();
  }

  render() {
    const navbar = this.state.loggedInUserDetail ? (
      <Navbar
        userIcon={this.state.loggedInUserDetail.primaryPic}
        userName={this.state.loggedInUserDetail.userName}
      />
    ) : (
      <Navbar />
    );

    return (
      <div className="LayoutContent">
        {navbar}
        <Profile />
        <Home />
      </div>
    );
  }
}

export default Layout;

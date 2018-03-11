import React, { Component } from 'react';

import Auth from '../utils/authService';
import Home from './Home';
import Navbar from '../components/NavigationBar';
import Profile from './Profile';

import './styles/Layout.css';

class Layout extends Component {
  render() {
    return (
      <div className="LayoutContent">
        <Navbar
          userIcon={Auth.loggedInUser.img}
          userName={Auth.loggedInUser.userName}
        />
        <Profile />
        <Home />
      </div>
    );
  }
}

export default Layout;

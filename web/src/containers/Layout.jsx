import React, { Component } from 'react';

import Auth from '../utils/authService';
import Matches from './Matches';
import Navbar from '../components/NavigationBar';

import './styles/Layout.css';

class Layout extends Component {
  render() {
    return (
      <div className="LayoutContent">
        <Navbar
          userIcon={Auth.loggedInUser.img}
          userName={Auth.loggedInUser.userName}
        />
        <Matches />
      </div>
    );
  }
}

export default Layout;

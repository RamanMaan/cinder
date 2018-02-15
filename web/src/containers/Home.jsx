import React, { Component } from 'react';

import Auth from '../utils/authService';
import Matches from './Matches';
import Navbar from '../components/NavigationBar';

import './styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="HomeContent">
        <Navbar
          userIcon={Auth.loggedInUser.img}
          userName={Auth.loggedInUser.userName}
        />
        <Matches />
      </div>
    );
  }
}

export default Home;

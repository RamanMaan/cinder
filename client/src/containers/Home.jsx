import React, { Component } from 'react';
import Matches from './Matches';
import Navbar from '../components/NavigationBar';

import './styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="HomeContent">
        <Navbar />
        <Matches />
      </div>
    );
  }
}

export default Home;

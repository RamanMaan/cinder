import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './styles/App.css';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Auth from '../utils/authService';
import './styles/App.css';

import Layout from './Layout';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            path="/"
            authed={Auth.isAuthenticated}
            component={Layout}
          />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;

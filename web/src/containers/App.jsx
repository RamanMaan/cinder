import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import './styles/App.css';
import { connect } from 'react-redux';

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
            exact
            path="/"
            authed={this.props.isAuthenticated}
            component={Layout}
          />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, null)(App));

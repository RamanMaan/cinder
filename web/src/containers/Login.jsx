import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import './styles/Login.css';
import logo from '../assets/logo.svg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.setInput = this.setInput.bind(this);
    this.userLogin = this.userLogin.bind(this);

    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      loginBtnText: 'Log In'
    };
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  userLogin(e) {
    e.preventDefault();

    this.setState({ loginBtnText: 'Logging In...' });
    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ loginBtnText: 'Log In', loggedIn: true });
        } else {
          throw new Error(`Login Error: ${res.status}`);
        }
      })
      .catch(err => {
        this.setState({ loginBtnText: 'Log In' });
        // TODO - better errors for user - what went wrong?
        switch (err) {
          default:
            console.error(err);
        }
      });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Login">
        <Container>
          <div className="logo">
            <h1 className="display-3">cinder</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <hr />

          <Form className="login-form" onSubmit={e => this.userLogin(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.setInput}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                required
                id="password"
                type="password"
                name="password"
                onChange={this.setInput}
                placeholder="Password"
              />
            </FormGroup>

            <FormGroup>
              <Button id="submitBtn" outline block color="dark" type="submit">
                {this.state.loginBtnText}
              </Button>

              <Button
                id="signUpBtn"
                outline
                block
                color="secondary"
                tag={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;

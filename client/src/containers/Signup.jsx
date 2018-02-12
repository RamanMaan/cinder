import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import './styles/Signup.css';
import logo from '../assets/logo.svg';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.setInput = this.setInput.bind(this);

    this.state = {
      email: '',
      emailCheck: false,
      userName: '',
      password: '',
      confirmPassword: '',
      birthday: '',
      gender: '',
      latitude: '',
      longitude: '',
      bio: '',
      religion: '',
      userPics: '',

      signnedUp: false,
      signupBtnText: 'Sign up'
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.signnedUp) {
      return <Redirect to="/login" />;
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
              <Label for="email">Email Address</Label>
              <Input
                required
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={this.setInput}
              />
            </FormGroup>

            <FormGroup>
              <Label for="userName">User Name</Label>
              <Input
                required
                id="userName"
                type="userName"
                name="userName"
                placeholder="User Name"
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
              <Label for="password">Confirm Password</Label>
              <Input
                required
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={this.setInput}
                placeholder="Confirm Password"
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleDate">Birthday</Label>
              <Input
                type="date"
                name="birthday"
                id="birthday"
                placeholder="Birthday"
              />
            </FormGroup>

            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input type="select" name="gender" id="gender">
                <option />
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="bio">Bio</Label>
              <Input type="textarea" name="bio" id="bio" />
            </FormGroup>

            <FormGroup>
              <Label for="religion">Religion</Label>
              <Input type="select" name="religion" id="religion">
                <option />
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="userPics">Picture</Label>
              <Input
                type="url"
                name="userPics"
                id="userPics"
                placeholder="Picture's URL"
              />
            </FormGroup>

            <FormGroup>
              <Button id="submitBtn" outline block color="dark" type="submit">
                {this.state.signupBtnText}
              </Button>

              <Button
                id="login"
                outline
                block
                color="dark"
                tag={Link}
                to="/login"
              >
                Back to Log in page
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;

import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import './styles/Signup.css';
import logo from '../assets/logo.svg';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.setInput = this.setInput.bind(this);
    this.fetchGenderOptions = this.fetchGenderOptions.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.userSignup = this.userSignup.bind(this);

    this.state = {
      email: '',
      emailConfirm: '',
      emailCheck: false,
      password: '',
      passwordConfirm: '',
      userName: '',
      birthday: '',
      gender: '',
      signnedUp: false,
      signupBtnText: 'Sign up'
    };
  }

  fetchGenderOptions() {
    // Integration with API
    // fetch(`/api/reference/gender`)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.props.gender({
    //       matches: res.map(x => ({
    //         id: x.genderID,
    //         genderType: x.genderType
    //       }))
    //     });
    //   })
    //   .catch(err => console.error(err));
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

  userSignup(e) {
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
    if (this.state.signnedUp) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="Signup">
        <Container>
          <div className="logo">
            <h1 className="display-3">cinder</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <hr />

          <div className="inputPart">
            <Form className="signup-form" onSubmit={e => this.userSignup(e)}>
              <div className="row">
                <div className="col-sm">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      required
                      id="email"
                      type="email"
                      name="email"
                      onChange={this.setInput}
                    />
                  </FormGroup>
                </div>
                <div className="col-sm">
                  <FormGroup>
                    <Label for="emailConfirm">Please re-enter email</Label>
                    <Input
                      required
                      id="emailConfirm"
                      type="email"
                      name="emailConfirm"
                      onChange={this.setInput}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-sm">
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      required
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.setInput}
                    />
                  </FormGroup>
                </div>
                <div className="col-sm">
                  <FormGroup>
                    <Label for="passwordConfirm">
                      Please re-enter password
                    </Label>
                    <Input
                      required
                      id="passwordConfirm"
                      type="password"
                      name="passwordConfirm"
                      onChange={this.setInput}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-sm">
                  <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="gender" id="gender" required>
                      <option />
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col-sm">
                  <FormGroup>
                    <Label for="birthday">Birthday</Label>
                    <Input required type="date" name="birthday" id="birthday" />
                  </FormGroup>
                </div>
              </div>

              <FormGroup>
                <Label for="userName">Name</Label>
                <Input
                  required
                  id="userName"
                  name="userName"
                  placeholder="Just first name is enough"
                  onChange={this.setInput}
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
                  Log in
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default Signup;

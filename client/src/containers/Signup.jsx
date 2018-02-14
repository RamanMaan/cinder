import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import './styles/Signup.css';
import logo from '../assets/logo.svg';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.setInput = this.setInput.bind(this);
    this.fetchGenderList = this.fetchGenderList.bind(this);
    this.userSignup = this.userSignup.bind(this);

    this.state = {
      genderList: [],
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      userName: '',
      birthday: '',
      gender: '',
      signnedUp: false,
      signupBtnText: 'Sign Up'
    };
  }

  componentDidMount() {
    this.fetchGenderList();
  }

  fetchGenderList() {
    this.setState({
      genderList: [
        {
          id: 0,
          type: 'Male'
        },
        {
          id: 1,
          type: 'Female'
        },
        {
          id: 2,
          type: 'Other'
        }
      ]
    });
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  userSignup(e) {
    e.preventDefault();
    this.setState({ signupBtnText: 'Signing up...' });
    //TODO - adding signup connection with server
    this.setState({ loginBtnText: 'Sign Up', signnedUp: true });
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
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      required
                      onChange={this.setInput}
                    >
                      <option value="" />
                      {this.state.genderList.map(opt => {
                        return (
                          <option key={opt.id} value={opt.id}>
                            {opt.type}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </div>
                <div className="col-sm">
                  <FormGroup>
                    <Label for="birthday">Birthday</Label>
                    <Input
                      required
                      type="date"
                      name="birthday"
                      id="birthday"
                      onChange={this.setInput}
                    />
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
                  Log In
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

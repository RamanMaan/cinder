import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Col,
  Row,
  Label
} from 'reactstrap';
import { saveUserInfo, hideProfile } from '../actions';
import FilterElement from '../components/FilterElement';
import Dropdown from '../components/Dropdown';
import NumericInput from 'react-numeric-input';

import './styles/Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      name: '',
      birthday: '',
      bio: '',
      filters: {
        gender: null,
        age: null
      }
    };
  }

  componentWillReceiveProps() {
    this.setState({
      name: this.props.userInfo.userName,
      birthday: this.props.userInfo.birthday,
      bio: this.props.userInfo.userBio
    });
  }

  saveChanges(e) {
    e.stopPropagation();
    var user = { ...this.props.userInfo }; // <-- remove this later once the profile state is configured
    this.props.saveUser(user, this.props.token);
    this.props.hideProfile();
  }

  toggle(e) {
    e.stopPropagation();
    this.props.hideProfile();
  }

  onElementToggle(field, value) {
    this.setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [field]: {
          ...prev.filters[field],
          active: value
        }
      }
    }));
  }

  onElementChange(field, value) {
    this.setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [field]: {
          ...prev.filters[field],
          values: value
        }
      }
    }));
  }

  onAgeValueChange(field, value) {
    this.setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        age: {
          ...prev.filters.age,
          [field]: value
        }
      }
    }));
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderBody() {
    return (
      <div>
        <div className="name">
          <h5>Display Name</h5>
          <Input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onInputChange}
          />
        </div>
        <hr />
        <div className="birthday">
          <h5>Birthday</h5>
          <Input
            name="birthday"
            type="date"
            onChange={this.onInputChange}
            value={this.state.birthday}
          />
        </div>
        <hr />
        <div className="bio">
          <h5>User Bio</h5>
          <Input
            name="bio"
            type="textarea"
            value={this.state.bio}
            onChange={this.onInputChange}
          />
        </div>
        <hr />
        <div className="filters">
          <h5>User Filters</h5>
          <div className="gender">
            <h6>Gender Filter</h6>
            <FilterElement
              round
              onChange={this.onElementToggle.bind(this, 'gender')}
            >
              <Dropdown
                token={this.props.token}
                endpoint="/api/ref/gender"
                onChange={this.onElementChange.bind(this, 'gender')}
              />
            </FilterElement>
          </div>
          <div className="age">
            <h6>Age Filter</h6>
            <FilterElement
              round
              onChange={this.onElementToggle.bind(this, 'age')}
            >
              <Row>
                <Col md={6}>
                  <Label>Minimum Age: </Label>
                  <NumericInput
                    min={18}
                    onChange={this.onAgeValueChange.bind(this, 'minAge')}
                  />
                </Col>
                <Col md={6}>
                  <Label>Maximum Age: </Label>
                  <NumericInput
                    min={
                      this.state.filters.age
                        ? this.state.filters.age.minAge
                        : 18
                    }
                    max={80}
                    onChange={this.onAgeValueChange.bind(this, 'maxAge')}
                  />
                </Col>
              </Row>
            </FilterElement>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const modal = !this.props.isVisible ? null : (
      <div className="profile modal" onClick={e => this.toggle(e)}>
        <Container>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ModalHeader toggle={e => this.toggle(e)}>My Profile</ModalHeader>
            <ModalBody>{this.renderBody()}</ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={e => this.toggle(e)}>
                Discard Changes
              </Button>
              <Button color="primary" onClick={e => this.saveChanges(e)}>
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        </Container>
      </div>
    );

    return <div>{modal}</div>;
  }
}

const mapStateToProps = state => ({
  isVisible: state.profileDisplay.isVisible,
  userID: state.auth.userID,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  saveUser: (user, token) => dispatch(saveUserInfo(user, token)),
  hideProfile: () => dispatch(hideProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

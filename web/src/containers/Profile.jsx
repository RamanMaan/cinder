import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from 'reactstrap';
import { saveUserInfo, hideProfile } from '../actions';
import FilterElement from '../components/FilterElement';
import Dropdown from '../components/Dropdown';

import './styles/Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      filters: {
        gender: null
      }
    };
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

  onDropdownChange(field, value) {
    if (!value || !value.length) {
      this.setState(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [field]: null
        }
      }));
    } else {
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
  }

  renderBody() {
    return (
      <div>
        <div className="name">
          <h5>Display Name</h5>
          <Input type="text" defaultValue={this.props.userInfo.userName} />
        </div>
        <hr />
        <div className="birthday">
          <h5>Birthday</h5>
          <Input
            type="date"
            defaultValue={
              new Date(this.props.userInfo.birthday).toJSON().split('T')[0]
            }
          />
        </div>
        <hr />
        <div className="bio">
          <h5>User Bio</h5>
          <Input type="textarea" defaultValue={this.props.userInfo.userBio} />
        </div>
        <hr />
        <div className="filters">
          <h5>User Filters</h5>
          <div className="gender">
            <h7>Gender Filter</h7>
            <FilterElement
              round
              onChange={this.onElementToggle.bind(this, 'gender')}
            >
              <Dropdown
                token={this.props.token}
                endpoint="/api/ref/gender"
                onChange={this.onDropdownChange.bind(this, 'gender')}
              />
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

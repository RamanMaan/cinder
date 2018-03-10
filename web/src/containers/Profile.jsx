import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { fetchProfile, hideProfile } from '../actions';

import './styles/Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    this.props.hideProfile();
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const modal = !this.props.view ? null : (
      <div className="profile modal" onClick={e => this.toggle(e)}>
        <div className="modal-dialog">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ModalHeader toggle={e => this.toggle(e)}>My Profile</ModalHeader>
            <ModalBody>Hello there</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => this.toggle(e)}>
                Something
              </Button>
            </ModalFooter>
          </div>
        </div>
      </div>
    );

    return <div>{modal}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.profileIsLoading,
  errored: state.profileHasErrored,
  open: state.profileOpened,
  view: state.profileView
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchProfile()),
  hideProfile: () => dispatch(hideProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

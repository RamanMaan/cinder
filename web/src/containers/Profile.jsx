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

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const modal = !this.props.view ? null : <h1>Hello</h1>;

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

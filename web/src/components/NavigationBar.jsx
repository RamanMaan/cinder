import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showProfile, logoutUser } from '../actions';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import './styles/NavigationBar.css';

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }

  render() {
    return (
      <Navbar color="primary" className="navbar-expand-md navbar-dark">
        <NavbarBrand href="/">cinder</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem onClick={() => this.props.showProfile()}>
              <NavLink href="#">
                <img src={this.props.userIcon} alt="" />
                {this.props.userName}
              </NavLink>
            </NavItem>
            <Button onClick={() => this.props.logout()} color="danger">
              Logout
            </Button>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  showProfile: () => dispatch(showProfile()),
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

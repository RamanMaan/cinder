import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './styles/Home.css';
import Recommendation from './Recommendation';
import MatchesList from '../components/MatchesList';
import UserDetail from '../components/UserDetail';
import Auth from '../utils/authService';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.fetchUserDetail = this.fetchUserDetail.bind(this);

    this.state = {
      matches: [],
      userDetail: false,
      buttonSelected: false
    };
  }

  onBackButtonClick() {
    this.setState({ buttonSelected: true });
    this.setState({ userDetail: false });
  }

  fetchUserDetail(id) {
    fetch(`/api/users/${Auth.userID}/matches/${id}`, {
      headers: { Authorization: `Bearer ${Auth.token}` }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          userDetail: {
            userID: res.userID,
            userName: res.userName,
            userPics: res.userPics,
            userAge: res.userAge,
            userGender: res.userGender,
            matchTime: new Date(),
            userBio: res.userBio ? res.userBio : 'No bio'
          }
        });
      })
      .catch(err => err);
  }

  render() {
    const leftPane = (
      <MatchesList clickHandler={this.fetchUserDetail.bind(this)} />
    );

    const rightPane = this.state.userDetail ? (
      <UserDetail
        img={this.state.userDetail.userPics}
        name={this.state.userDetail.userName}
        age={this.state.userDetail.userAge}
        bio={this.state.userDetail.userBio}
        matchDate={this.state.userDetail.matchTime}
        backButton={this.onBackButtonClick.bind(this)}
      />
    ) : (
      <Recommendation />
    );

    return (
      <div className="Home">
        <Container fluid>
          <Row className="full">
            <Col md="4" lg="3">
              {leftPane}
            </Col>
            <Col md="8" lg="9">
              {rightPane}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

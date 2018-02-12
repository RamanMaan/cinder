import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';

import './styles/Matches.css';
import PotentialMatch from './PotentialMatch';
import MatchesList from '../components/MatchesList';
import UserDetail from '../components/UserDetail';

class Matches extends Component {
  constructor(props) {
    super(props);

    this.fetchUserDetail = this.fetchUserDetail.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
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

  componentDidMount() {
    this.fetchUserMatches();
  }

  fetchUserDetail(id) {
    const loggedInUserID = 1;
    fetch(`/api/users/${loggedInUserID}/matches/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          userDetail: {
            userID: res[0].userID,
            userName: res[0].userName,
            userPics: res[0].userPics,
            userAge: 21,
            userGender: res[0].userGender,
            matchTime: new Date(),
            userBio: res[0].userBio ? res[0].userBio : 'No bio',
            matchNote: 'To remove'
          }
        });
      })
      .catch(err => err);
  }

  fetchUserMatches() {
    const loggedInUserID = 1;
    fetch(`/api/users/${loggedInUserID}/matches`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          matches: res.map(x => ({
            id: x.userID,
            title: x.userName,
            subtitle: "You've just matched!",
            date: new Date(x.matchDate),
            img: x.primaryPic
          }))
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let rightPane = null;

    if (!this.state.userDetail) {
      rightPane = <PotentialMatch />;
    } else {
      rightPane = (
        <div>
          <Button
            outline
            color="primary"
            className="BackButton"
            onClick={() => this.onBackButtonClick()}
          >
            Back
          </Button>
          <UserDetail userDetail={this.state.userDetail} />
        </div>
      );
    }
    return (
      <div className="Matches">
        <Container fluid>
          <Row className="full">
            <Col sm="4">
              <MatchesList
                matches={this.state.matches}
                clickHandler={this.fetchUserDetail.bind(this)}
              />
            </Col>
            <Col sm="8">{rightPane}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Matches;

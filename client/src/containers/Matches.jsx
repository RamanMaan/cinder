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
      rSelected: false
    };
  }

  onBackButtonClick(rSelected) {
    this.setState({ rSelected });
    this.state.userDetail = false;
  }

  componentDidMount() {
    this.fetchUserMatches();
    this.fetchUserDetail();
  }

  fetchUserDetail(id) {
    const data = [
      {
        userID: 0,
        userName: 'Kendrick Lamar',
        userPics:
          'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg',
        userAge: 21,
        userGender: 'Male',
        matchTime: new Date(),
        userBio: 'They got there early, and they got really good seats.',
        matchNote: 'He didn’t want to go to the dentist, yet he went anyway.'
      },
      {
        userID: 1,
        userName: 'Mac Miller',
        userPics:
          'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
        userAge: 24,
        userGender: 'Male',
        matchTime: new Date(),
        userBio: 'The waves were crashing on the shore; it was a lovely sight.',
        matchNote:
          'I think I will buy the red car, or I will lease the blue one.'
      },
      {
        userID: 2,
        userName: 'Ian Simpson',
        userPics:
          'https://media.pitchfork.com/photos/592997c25e6ef9596931f65a/1:1/w_300/e2fc485c.jpg',
        userAge: 21,
        userGender: 'Male',
        matchTime: new Date(),
        userBio: 'Hurry!',
        matchNote:
          'Malls are great places to shop; I can find everything I need under one roof.'
      },
      {
        userID: 3,
        userName: 'Kendrick Lamar',
        userPics:
          'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg',
        userAge: 32,
        userGender: 'Male',
        matchTime: new Date(),
        userBio:
          'A song can make or ruin a person’s day if they let it get to them.',
        matchNote: 'Check back tomorrow; I will see if the book has arrived.'
      },
      {
        userID: 4,
        userName: 'Mac Miller',
        userPics:
          'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
        userAge: 16,
        userGender: 'Male',
        matchTime: new Date(),
        userBio:
          'She did not cheat on the test, for it was not the right thing to do.',
        matchNote: 'I often see the time 11:11 or 12:34 on clocks.'
      },
      {
        userID: 5,
        userName: 'Ian Simpson',
        userPics:
          'https://media.pitchfork.com/photos/592997c25e6ef9596931f65a/1:1/w_300/e2fc485c.jpg',
        userAge: 22,
        userGender: 'Male',
        matchTime: new Date(),
        userBio: 'I really want to go to work, but I am too sick to drive.',
        matchNote: 'They got there early, and they got really good seats.'
      },
      {
        userID: 6,
        userName: 'Kendrick Lamar',
        userPics:
          'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg',
        userAge: 23,
        userGender: 'Male',
        matchTime: new Date(),
        userBio: 'The stranger officiates the meal.',
        matchNote:
          'I will never be this young again. Ever. Oh damn… I just got older.'
      },
      {
        userID: 7,
        userName: 'Mac Miller',
        userPics:
          'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
        userAge: 19,
        userGender: 'Male',
        matchTime: new Date(),
        userBio:
          'Last Friday in three week’s time I saw a spotted striped blue worm shake hands with a legless lizard.',
        matchNote:
          'Wednesday is hump day, but has anyone asked the camel if he’s happy about it?'
      }
    ];

    this.setState({ userDetail: data.find(x => x.userID === id) });
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
            onClick={() => this.onBackButtonClick(1)}
            active={(this.state.rSelected = true)}
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

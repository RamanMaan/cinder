import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PotentialMatchDetail from '../components/PotentialMatchDetail';

export default class PotentialMatch extends Component {
  constructor(props) {
    super(props);
    this.fetchPotentialMatches = this.fetchPotentialMatches.bind(this);
    this.handleApprovedMatch = this.handleApprovedMatch.bind(this);
    this.handleRejectedMatch = this.handleRejectedMatch.bind(this);

    this.state = {
      potentialMatches: [],
      matchIndex: 0
    };
  }

  componentDidMount() {
    this.fetchPotentialMatches();
  }

  increment() {
    this.setState(prevIndex => {
      return { matchIndex: prevIndex.matchIndex + 1 };
    });
  }

  handleApprovedMatch() {
    this.increment();
    // api call to add to like table, sending the user id of the approved user
  }

  handleRejectedMatch() {
    this.increment();
    // api call to add to like table, sending the user id of the rejected user
  }

  fetchPotentialMatches() {
    const loggedInUserID = 1;
    fetch(`/api/users/${loggedInUserID}/potentials`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          potentialMatches: res.map(x => ({
            id: x.userID,
            title: x.userName,
            age: x.age,
            img: x.primaryPic
          }))
        });
      })
      .then(console.log(this.state.potentialMatches))
      .catch(err => console.error(err));

    // this.setState({
    //   potentialMatches: [
    //     {
    //       id: 0,
    //       title: 'Kendrick Lamar',
    //       age: 30,
    //       subtitle: 'How u doin?',
    //       img: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg'
    //     },
    //     {
    //       id: 1,
    //       title: 'Mac Miller | Larry Fisherman | Delusional Thomas',
    //       age: 26,
    //       subtitle:
    //         ';););) Want to meet hot new singles? Click this totally legit link: www.gethotsingles.com',
    //       img:
    //         'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b'
    //     },
    //     {
    //       id: 2,
    //       title: 'Ian Simpson',
    //       age: 21,
    //       subtitle: 'What u wearin',
    //       img:
    //         'https://media.pitchfork.com/photos/592997c25e6ef9596931f65a/1:1/w_300/e2fc485c.jpg'
    //     }
    //   ]
    // });
  }

  render() {
    if (!this.state.potentialMatches.length) {
      return (
        <div>
          <h1>There's no one new around you. TEST</h1>
        </div>
      );
    }

    return (
      <div className="PotentialMatchDetailContainer">
        <PotentialMatchDetail
          potentialMatchDetail={
            this.state.potentialMatches[this.state.matchIndex]
          }
        />
        <br />
        <Button
          className="NotButton"
          color="danger"
          onClick={this.handleRejectedMatch.bind(this)}
        >
          NOT
        </Button>
        <Button
          className="HotButton"
          color="success"
          onClick={this.handleApprovedMatch.bind(this)}
        >
          HOT
        </Button>
      </div>
    );
  }
}

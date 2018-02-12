import React, { Component } from 'react';
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
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.potentialMatches.length) {
      return (
        <div>
          <h1>There's no one new around you.</h1>
        </div>
      );
    }

    return (
      <div className="PotentialMatchDetailContainer">
        <PotentialMatchDetail
          potentialMatchDetail={
            this.state.potentialMatches[this.state.matchIndex]
          }
          handlePass={this.handleRejectedMatch.bind(this)}
          handleLike={this.handleApprovedMatch.bind(this)}
        />
        <br />
      </div>
    );
  }
}

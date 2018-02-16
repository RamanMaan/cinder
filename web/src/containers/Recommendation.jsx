import React, { Component } from 'react';
import RecommendationDetail from '../components/RecommendationDetail';
import Auth from '../utils/authService';

export default class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.fetchPotentialMatches = this.fetchPotentialMatches.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePass = this.handlePass.bind(this);

    this.state = {
      potentialMatches: [],
      matchIndex: 0
    };
  }

  componentDidMount() {
    this.fetchPotentialMatches();
  }

  incrementPotentialMatchIndex() {
    this.setState(prevIndex => ({ matchIndex: prevIndex.matchIndex + 1 }));
  }

  handlePass() {
    this.submitUserAction('pass');
    this.incrementPotentialMatchIndex();
  }

  handleLike() {
    this.submitUserAction('like');
    this.incrementPotentialMatchIndex();
  }

  submitUserAction(userAction) {
    const matchedUser = this.state.potentialMatches[this.state.matchIndex].id;

    fetch(`/api/users/${Auth.loggedInUser.id}/matches/${matchedUser}/${userAction}`, { method: 'POST' })
      .then(res => res.json())
      .then(res => {
        this.setState({
          // TODO
        });
      })
      .catch(err => console.error(err));
  }

  fetchPotentialMatches() {
    fetch(`/api/users/${Auth.loggedInUser.id}/recommendations`)
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
        <RecommendationDetail
          potentialMatchDetail={
            this.state.potentialMatches[this.state.matchIndex]
          }
          handlePass={this.handlePass.bind(this)}
          handleLike={this.handleLike.bind(this)}
        />
        <br />
      </div>
    );
  }
}

import React, { Component } from 'react';
import UserDetail from '../components/UserDetail';
import Auth from '../utils/authService';

export default class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.fetchPotentialMatches = this.fetchPotentialMatches.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePass = this.handlePass.bind(this);

    this.state = {
      potentialMatches: [],
      matchIndex: 0,
      currRecommendation: {}
    };
  }

  componentDidMount() {
    this.fetchPotentialMatches();
  }

  incrementPotentialMatchIndex() {
    this.setState(prevIndex => ({ matchIndex: prevIndex.matchIndex + 1 }));
    this.setState({ currRecommendation: this.state.potentialMatches[this.state.matchIndex]});
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
    console.log(`Doing Action ${userAction} on ${this.state.currRecommendation.name}`);

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
            name: x.userName,
            age: x.age,
            img: x.primaryPic,
            bio: x.userBio
          }))
        });
        this.setState({ currRecommendation: this.state.potentialMatches[this.state.matchIndex]});
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.potentialMatches.length) {
      return (
        <div className="empty">
          <h1 className="msg">There's no one new around you :(</h1>
        </div>
      );
    }

    const {img, name, age, bio} = this.state.currRecommendation;

    return (
      <UserDetail
        img={img}
        name={name}
        age={age}
        bio={bio}
        matchBtns={{
          handleLike: this.handleLike.bind(this),
          handlePass: this.handlePass.bind(this)
        }}
      />
    );
  }
}

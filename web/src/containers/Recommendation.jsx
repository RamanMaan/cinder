import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  matchesFetchData,
  fetchRecommendations,
  popRecommendation
} from '../actions';
import Auth from '../utils/authService';

import './styles/Recommendation.css';
import UserDetail from '../components/UserDetail';

export class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handlePass = this.handlePass.bind(this);

    this.state = {
      matchIndex: 0,
      currRecommendation: {}
    };
  }

  componentDidMount() {
    this.props.fetchRecommends(
      `/api/users/${Auth.loggedInUser.id}/recommendations`
    );
  }

  incrementPotentialMatchIndex() {
    this.props.popRecommend();
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
    const matchedUser = this.props.recommendations[0];
    console.log(`Doing Action ${userAction} on ${matchedUser.userName}`);

    fetch(
      `/api/users/${Auth.loggedInUser.id}/matches/${
        matchedUser.userID
      }/${userAction}`,
      { method: 'POST' }
    )
      .then(res => res.json())
      .then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.matched == 'true') {
          this.props.fetchMatches(`/api/users/${Auth.loggedInUser.id}/matches`);
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const msg = this.props.loading
      ? 'Loading...'
      : !this.props.recommendations.length
        ? "There's no one new around you :("
        : 'There was an error loading matches';

    if (
      this.props.errored ||
      this.props.loading ||
      !this.props.recommendations.length
    ) {
      return (
        <div className="empty">
          <h3 className="msg align-self-center">{msg}</h3>
        </div>
      );
    }

    const {
      primaryPic: img,
      userName: name,
      age,
      userBio: bio
    } = this.props.recommendations[0];

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

const mapStateToProps = state => ({
  recommendations: state.recommendations,
  errored: state.recommendationsHasErrored,
  loading: state.recommendationsIsLoading
});

const mapDispatchToProps = dispatch => ({
  fetchMatches: uri => dispatch(matchesFetchData(uri)),
  fetchRecommends: uri => dispatch(fetchRecommendations(uri)),
  popRecommend: () => dispatch(popRecommendation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);

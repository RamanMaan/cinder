import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchRecommendations,
  popRecommendation,
  submitRecommendation
} from '../actions';
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
    this.props.fetchRecommends(this.props.userID, this.props.token);
  }

  incrementPotentialMatchIndex() {
    this.props.popRecommend();
  }

  handlePass() {
    this.submitUserAction(false);
    this.incrementPotentialMatchIndex();
  }

  handleLike() {
    this.submitUserAction(true);
    this.incrementPotentialMatchIndex();
  }

  submitUserAction(like) {
    const matchedUser = this.props.recommendations[0];
    this.props.submitRecommendation(
      this.props.userID,
      matchedUser.userID,
      like,
      this.props.token
    );
  }

  render() {
    const msg = this.props.loading
      ? 'Loading...'
      : !this.props.recommendations.length
        ? 'There is no one new around you :('
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
  userID: state.auth.userID,
  token: state.auth.token,
  recommendations: state.rec.recommendations,
  errored: state.rec.errored,
  loading: state.rec.loading
});

const mapDispatchToProps = dispatch => ({
  fetchRecommends: (userID, token) =>
    dispatch(fetchRecommendations(userID, token)),
  popRecommend: () => dispatch(popRecommendation()),
  submitRecommendation: (user1, user2, like, token) =>
    dispatch(submitRecommendation(user1, user2, like, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);

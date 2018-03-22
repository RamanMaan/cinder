import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchOneMatch, clearOneMatch } from '../actions';
import './styles/Home.css';
import Recommendation from './Recommendation';
import MatchesList from '../components/MatchesList';
import UserDetail from '../components/UserDetail';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.fetchUserDetail = this.fetchUserDetail.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.state = {
      buttonSelected: false
    };
  }

  onBackButtonClick() {
    this.setState({ buttonSelected: true });
    this.props.clearMatch();
  }

  fetchUserDetail(matchID) {
    this.props.fetchMatch(this.props.userID, matchID, this.props.token);
  }

  render() {
    const leftPane = <MatchesList clickHandler={this.fetchUserDetail} />;

    const rightPane = Object.keys(this.props.match).length ? (
      <UserDetail
        img={this.props.match.userPics}
        name={this.props.match.userName}
        age={this.props.match.userAge}
        bio={this.props.match.userBio}
        matchDate={this.props.match.matchTime}
        backButton={this.onBackButtonClick}
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

const mapStateToProps = state => ({
  userID: state.auth.userID,
  token: state.auth.token,
  match: state.match.oneMatch
});

const mapDispatchToProps = dispatch => ({
  fetchMatch: (userID, matchID, token) =>
    dispatch(fetchOneMatch(userID, matchID, token)),
  clearMatch: () => dispatch(clearOneMatch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

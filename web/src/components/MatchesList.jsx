import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllMatches } from '../actions';
import MatchesListItem from '../components/MatchesListItem';
import './styles/MatchesList.css';

export class MatchesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    this.props.fetchData(this.props.userID, this.props.token);
  }

  onListItemClick(id) {
    this.setState({ active: id });
    this.props.clickHandler(id);
  }

  render() {
    const msg = this.props.loading
      ? 'Loading...'
      : !this.props.matches.length
        ? 'No matches yet. Get swiping!'
        : 'There was an error loading matches';

    if (
      this.props.errored ||
      (this.props.loading && !this.props.matches.length) ||
      !this.props.matches.length
    ) {
      return (
        <div className="MatchesList">
          <div className="empty">
            <h3 className="msg align-self-center">{msg}</h3>
          </div>
        </div>
      );
    }

    const listItems = this.props.matches.map(
      ({ userID, userName, userBio, primaryPic, matchDate }) => (
        <MatchesListItem
          key={userID}
          title={userName}
          subtitle={userBio}
          img={primaryPic}
          date={matchDate}
          active={userID === this.state.active}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={this.onListItemClick.bind(this, userID)}
        />
      )
    );

    return (
      <div className="MatchesList">
        <ul>{listItems}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.match.matches,
  errored: state.match.errored,
  loading: state.match.loading,
  userID: state.auth.userID,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  fetchData: (userID, token) => dispatch(fetchAllMatches(userID, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);

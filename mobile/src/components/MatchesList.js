import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Text, Container, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';

import { matchesFetchData } from '../actions';
import MatchesListItem from './MatchesListItem';


export class MatchesList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
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
        <Container style={styles.container}>
          <Text>{msg}</Text>
        </Container>
      );
    }

    const listItems = this.props.matches.map(({
      userID, userName, userBio, primaryPic, matchDate,
    }) =>
      (<MatchesListItem
        key={userID}
        userID={userID}
        userName={userName}
        userBio={userBio}
        primaryPic={primaryPic}
        matchDate={matchDate}
      />));

    return (
      <List>
        {listItems}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.matches,
  errored: state.matchesHasErrored,
  loading: state.matchesIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(matchesFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

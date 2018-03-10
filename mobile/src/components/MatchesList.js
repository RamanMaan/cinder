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
      : this.props.errored
        ? 'There was an error loading matches'
        : 'No matches yet. Get swiping!';

    if (
      this.props.errored ||
      (this.props.loading && !(this.props.matches && this.props.matches.length)) ||
      !this.props.matches.length
    ) {
      return (
        <Container style={styles.container}>
          <Text>{msg}</Text>
        </Container>
      );
    }

    const listItems = this.props.matches.map(match =>
      (<MatchesListItem
        key={match.userID}
        userID={match.userID}
        userName={match.userName}
        userBio={match.userBio}
        primaryPic={match.primaryPic}
        matchDate={match.matchDate}
        onPress={() => this.props.openDetails(match)}
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

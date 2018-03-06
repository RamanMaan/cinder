import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Icon, Text } from 'native-base';

import { fetchRecommendations, submitRecommendation, userMatchRedirected } from '../actions';

import cinder from '../theme/variables/cinder';
import Recommendations from '../components/Recommendations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRight: {
    marginRight: cinder.iconMarginSize,
  },
  itemLeft: {
    marginLeft: cinder.iconMarginSize,
  },
});

export class Home extends React.Component {
  static navigationOptions({ navigation }) {
    const leftItem = (
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="ios-contact" />
        </TouchableOpacity>
      </View>
    );
    const rightItem = (
      <View style={styles.itemRight}>
        <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
          <Icon name="ios-send" />
        </TouchableOpacity>
      </View>
    );

    return {
      headerLeft: (
        leftItem
      ),
      headerRight: (
        rightItem
      ),
    };
  }

  constructor(props) {
    super(props);

    this.onSwipe = this.onSwipe.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecommends();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.matched) {
      this.props.navigation.navigate('Matches');
      // have to set it to null again in case multiple matches in a row
      this.props.redirected();
    }
  }

  onSwipe(action, user) {
    this.props.submitRecommend(user.userID, action);
  }

  render() {
    const msg = this.props.loading
      ? 'Loading...'
      : this.props.errored
        ? 'There was an error loading recommendations'
        : 'No recommendations left! :(';


    if (this.props.errored || this.props.loading || !this.props.recommendations || !this.props.recommendations.length) {
      return (
        <Container style={styles.container}>
          <Text>{msg}</Text>
        </Container>
      );
    }

    return (
      <Container>
        <Recommendations data={this.props.recommendations} onSwipe={this.onSwipe} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  recommendations: state.recommendations,
  errored: state.recommendationsHasErrored,
  loading: state.recommendationsIsLoading,
  matched: state.usersMatched,
});

const mapDispatchToProps = dispatch => ({
  fetchRecommends: () => dispatch(fetchRecommendations()),
  submitRecommend: (recID, action) => dispatch(submitRecommendation(recID, action)),
  redirected: () => dispatch(userMatchRedirected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

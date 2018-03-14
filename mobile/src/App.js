import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Profile from './containers/profile';
import Matches from './containers/Matches';
import Details from './components/MatchedUserDetail';

const RootStack = StackNavigator({
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Matches: {
    screen: Matches,
  },
  Details: {
    screen: Details,
  },
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    title: 'cinder',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

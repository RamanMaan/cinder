import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './containers/home';
import Profile from './containers/blank';
import Matches from './containers/matches';

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
}, {
  initialRouteName: 'Matches',
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

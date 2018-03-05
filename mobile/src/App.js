import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Profile from './containers/blank';
import Matches from './containers/Matches';

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

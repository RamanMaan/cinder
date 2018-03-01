import * as Expo from 'expo';
import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';

import App from './src/App';
import getTheme from './src/theme/components';
import variables from './src/theme/variables/cinder';

import store from './src/store';

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}

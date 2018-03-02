import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import cinder from '../theme/variables/cinder';

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

export default class Home extends React.Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Page</Text>
        <Text>Test test!!!</Text>
      </View>
    );
  }
}

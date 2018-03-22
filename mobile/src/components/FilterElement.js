import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { H1, View, Text, Container, Button } from 'native-base';

import FilterModal from './FilterModal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
    borderRadius: 50,
  },
  filterContainer: {
    marginTop: 40,
  },
  userName: {
    marginTop: 10,
  },
  lineStyle: {
    alignSelf: 'stretch',
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 15,
    marginRight: 2,
    marginLeft: 2,
  },
});

export default class FilterElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.onBackdropPress} />
        <FilterModal
          {...this.props}
        />
      </View>
    );
  }
}

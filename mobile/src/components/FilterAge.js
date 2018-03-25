import React from 'react';
import { View } from 'native-base';
import { TextInput, StyleSheet } from 'react-native';

import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    margin: 15,
    padding: 5,
  },
});

export default class FilterAge extends React.Component {
  constructor(props) {
    super(props);

    this.updateMinAge = this.updateMinAge.bind(this);
    this.updateMaxAge = this.updateMaxAge.bind(this);
  }

  updateMinAge(value) {
    let newValue = '';
    const numbers = '0123456789';

    for (let i = 0; i < value.length; i += 1) {
      if (numbers.indexOf(value[i]) > -1) {
        newValue += value[i];
      }
    }
    this.props.onChange('minAge', newValue);
  }

  updateMaxAge(value) {
    let newValue = '';
    const numbers = '0123456789';

    for (let i = 0; i < value.length; i += 1) {
      if (numbers.indexOf(value[i]) > -1) {
        newValue += value[i];
      }
    }
    this.props.onChange('maxAge', newValue);
  }

  render() {
    return (
      <Modal
        useNativeDriver
        style={{ flex: 0.5 }}
        {...this.props}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={this.updateMinAge}
            keyboardType="numeric"
            placeholder="Enter minimum age filter"
            value={`${this.props.values.minAge}`}
          />

          <TextInput
            style={styles.input}
            onChangeText={this.updateMaxAge}
            keyboardType="numeric"
            placeholder="Enter maximum age filter"
            value={`${this.props.values.maxAge}`}
          />
        </View>
      </Modal>
    );
  }
}

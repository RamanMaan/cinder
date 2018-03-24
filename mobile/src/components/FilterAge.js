import React from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { TextInput, StyleSheet } from 'react-native';

import Modal from 'react-native-modal';

import { refFetchData } from '../actions';

export class FilterModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      minAge: '',
      maxAge: '',
    };

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
    this.setState({ minAge: newValue });
  }

  updateMaxAge(value) {
    let newValue = '';
    const numbers = '0123456789';

    for (let i = 0; i < value.length; i += 1) {
      if (numbers.indexOf(value[i]) > -1) {
        newValue += value[i];
      }
    }
    this.setState({ maxAge: newValue });
  }

  render() {
    return (
      <Modal
        avoidKeyboard
        useNativeDriver
        style={{ flex: 0.5 }}
        {...this.props}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={this.updateMinAge}
            keyboardType='numeric'
            placeholder='Enter minimum age filter'
            value={this.state.minAge}
          />

          <TextInput
            style={styles.input}
            onChangeText={this.updateMaxAge}
            keyboardType='numeric'
            placeholder='Enter maximum age filter'
            alue={this.state.maxAge}
          />
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    margin: 15,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const mapDispatchToProps = dispatch => ({
  fetchData: type => dispatch(refFetchData(type)),
});

export default connect(mapDispatchToProps)(FilterModal);

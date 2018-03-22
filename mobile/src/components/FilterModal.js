import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import Modal from 'react-native-modal';

/**
 * Props to develop TODO
 * - endpoint = provides endpoint to get data from
 * - multi - determines if multiple options
*/
export default class FilterModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // this.props.fetchData();
  }

  render() {
    return (
      <Modal {...this.props} >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    );
  }
}

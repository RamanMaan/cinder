import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import Modal from 'react-native-modal';
import SelectMultiple from 'react-native-select-multiple';

/**
 * Props to develop TODO
 * - endpoint = provides endpoint to get data from
 * - multi - determines if multiple options
*/
export default class FilterModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ['a', 'b', 'c'],
    };
  }

  componentDidMount() {
    // this.props.fetchData();
  }

  render() {
    return (
      <Modal
        avoidKeyboard
        useNativeDriver
        style={{ flex: 0.8 }}
        {...this.props}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SelectMultiple
            items={this.state.items}
            selectedItems={this.props.selectedItems}
            onSelectionsChange={this.props.onSelectChange}
          />
        </View>
      </Modal>
    );
  }
}

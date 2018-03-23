import React from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';

import Modal from 'react-native-modal';
import SelectMultiple from 'react-native-select-multiple';

import { refFetchData } from '../actions';

export class FilterModal extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.type);
  }

  render() {
    const items = this.props.refData.ref.map(x => ({ label: x.value, value: x.id }));
    return (
      <Modal
        avoidKeyboard
        useNativeDriver
        style={{ flex: 0.8 }}
        {...this.props}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SelectMultiple
            items={items}
            selectedItems={this.props.selectedItems}
            onSelectionsChange={this.props.onSelectChange}
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  refData: state.ref,
});

const mapDispatchToProps = dispatch => ({
  fetchData: type => dispatch(refFetchData(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);

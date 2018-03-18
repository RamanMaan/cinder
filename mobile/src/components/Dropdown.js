import React from 'react';
import { View, List, ListItem, Text, Container, Spinner } from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Props to develop TODO
 * - endpoint = provides endpoint to get data from
 * - multi - determines if multiple options
*/
export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);

    this.state = {
      items: [{ id: '92iijs7yta', name: 'Ondo' }, { id: 'a0s0a8ssbsd', name: 'Ogun' }, { id: '16hbajsabsd', name: 'Calabar' }, { id: 'nahs75a5sg', name: 'Lagos' }, { id: '667atsas', name: 'Maiduguri' }, { id: 'hsyasajs', name: 'Anambra' }, { id: 'djsjudksjd', name: 'Benue' }, { id: 'sdhyaysdj', name: 'Kaduna' }, { id: 'suudydjsjd', name: 'Abuja' }],
      selectedItems: [],
    };
  }

  componentDidMount() {
    // this.props.fetchData();
  }

  onSelectedItemsChange(items) {
    this.setState({ selectedItems: items });
  }

  render() {
    return (
      <View>
        <MultiSelect
          items={this.state.items.concat(this.state.items.map((x, i) => ({ id: i, name: x.name })))}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component; }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          displayKey="name"
        />
      </View>
    );
  }
}

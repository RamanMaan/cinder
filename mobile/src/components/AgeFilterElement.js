import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Switch } from 'native-base';

import FilterAge from './FilterAge';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  button: {
    flex: 1,
  },
});

export default props => (
  <View style={styles.container}>
    <Switch
      value={props.switch}
      onValueChange={props.switchToggle}
    />
    <Button light={!props.switch} onPress={props.onBackdropPress} style={styles.button}>
      <Text>{`Filter by ${props.type}`}</Text>
    </Button>
    <FilterAge
      {...props}
    />
  </View>
);

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { H1, View, Text, Container } from 'native-base';

import Dropdown from '../components/Dropdown';

const userDetails = {
  currUserPic: 'https://gazettereview.com/wp-content/uploads/2017/11/ugly-god.jpg',
  currUserName: 'Ugly God',
};

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

const items = [{ id: '1', name: 'Ondo' }, { id: '2', name: 'Ogun' }, { id: '3', name: 'Calabar' }, { id: '4', name: 'Lagos' }, { id: '5', name: 'Maiduguri' }, { id: '6', name: 'Anambra' }, { id: '7', name: 'Benue' }, { id: '8', name: 'Kaduna' }, { id: '9', name: 'Abuja' }];

export default class Profile extends React.Component {
  static navigationOptions(props) {
    return {
      title: 'My Profile',
    };
  }

  constructor(props) {
    super(props);

    this.bindGender = this.bindGender.bind(this);

    this.state = {

    };
  }

  bindGender(ref) {
    this.gender = ref;
    // this.gender.getSelectedItemsExt()
  }

  render() {
    return (
      <Container style={styles.container}>
        {/* <Image style={styles.image} source={{ uri: userDetails.currUserPic }} />
        <H1 style={styles.userName}>{userDetails.currUserName}</H1>
        <View style={styles.lineStyle} /> */}
        <View style={styles.filterContainer}>
          <Text>Filtering Options Here</Text>
          <View style={{ flex: 1, height: '100%' }}>
            <Dropdown items={items} field={this.bindGender} />
          </View>
        </View>
      </Container>
    );
  }
}

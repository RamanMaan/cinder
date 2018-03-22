import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { H1, View, Text, Container, Button } from 'native-base';

import FilterModal from '../components/FilterModal';

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

    this.showModal = this.showModal.bind(this);

    this.state = {
      genderModal: false,
    };
  }

  showModal() {
    this.setState({
      genderModal: true,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <FilterModal
          isVisible={this.state.genderModal}
          onBackdropPress={() => this.setState({ genderModal: false })}
        />

        <Image style={styles.image} source={{ uri: userDetails.currUserPic }} />
        <H1 style={styles.userName}>{userDetails.currUserName}</H1>
        <View style={styles.lineStyle} />

        <Container style={styles.filterContainer}>
          <Text>Filtering Options Here</Text>
          <Button onPress={() => this.showModal()} />
        </Container>
      </Container>
    );
  }
}

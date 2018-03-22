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

export default class Profile extends React.Component {
  static navigationOptions(props) {
    return {
      title: 'My Profile',
    };
  }

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);

    this.state = {
      gender: {
        modal: false,
        values: [],
      },
    };
  }

  toggleModal(type) {
    this.setState(prev => ({
      [type]: {
        ...prev[type],
        modal: !prev[type].modal,
      },
    }));
  }

  onSelectChange(type) {
    return selections => this.setState(prev => ({
      [type]: {
        ...prev[type],
        values: selections,
      },
    }));
  }

  render() {
    return (
      <Container style={styles.container}>
        <FilterModal
          isVisible={this.state.gender.modal}
          onBackdropPress={() => this.toggleModal('gender')}
          selectedItems={this.state.gender.values}
          onSelectChange={this.onSelectChange('gender')}
        />

        <Image style={styles.image} source={{ uri: userDetails.currUserPic }} />
        <H1 style={styles.userName}>{userDetails.currUserName}</H1>
        <View style={styles.lineStyle} />

        <Container style={styles.filterContainer}>
          <Text>Filtering Options Here</Text>
          <Button onPress={() => this.toggleModal('gender')} />
        </Container>
      </Container>
    );
  }
}

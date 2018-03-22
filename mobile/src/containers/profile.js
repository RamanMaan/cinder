import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { H1, View, Text, Container } from 'native-base';

import FilterElement from '../components/FilterElement';

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
  static navigationOptions() {
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
        switch: false,
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

  toggleSwitch(type) {
    this.setState(prev => ({
      [type]: {
        ...prev[type],
        switch: !prev[type].switch,
      },
    }));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Image style={styles.image} source={{ uri: userDetails.currUserPic }} />
        <H1 style={styles.userName}>{userDetails.currUserName}</H1>
        <View style={styles.lineStyle} />

        <Container style={styles.filterContainer}>
          <Text>Filtering Options Here</Text>
          <FilterElement
            type="gender"
            switch={this.state.gender.switch}
            switchToggle={() => this.toggleSwitch('gender')}
            isVisible={this.state.gender.modal}
            onBackdropPress={() => this.toggleModal('gender')}
            selectedItems={this.state.gender.values}
            onSelectChange={this.onSelectChange('gender')}
          />
        </Container>
      </Container>
    );
  }
}

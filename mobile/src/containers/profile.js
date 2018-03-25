import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, Picker } from 'react-native';
import { H1, View, Text, Container } from 'native-base';

import { fetchUserInfo } from '../actions';

import FilterElement from '../components/FilterElement';
import FilterModal from '../components/FilterModal';
import FilterAge from '../components/FilterAge';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
    borderRadius: 50,
    alignSelf: 'center',
  },
  filterContainer: {
    marginTop: 40,
  },
  userName: {
    marginTop: 10,
    alignSelf: 'center',
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

export class Profile extends React.Component {
  static navigationOptions() {
    return {
      title: 'My Profile',
    };
  }

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);

    this.state = {
      gender: {
        modal: false,
        switch: false,
        preference: [],
      },
      age: {
        modal: false,
        switch: false,
        minAge: 18,
        maxAge: 150,
      },
    };
  }

  componentDidMount() {
    this.props.fetchUserInfo(3);
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
        preference: selections,
      },
    }));
  }

  onAgeChange() {
    return (field, value) => this.setState(prev => ({
      age: {
        ...prev.age,
        [field]: value,
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
        <View>
          <Image accessibilityLabel="profile_image" style={styles.image} source={{ uri: this.props.userInfo.primaryPic }} />
          <H1 accessibilityLabel="profile_name" style={styles.userName}>{this.props.userInfo.userName}</H1>
          <View style={styles.lineStyle} />
        </View>

        <Container style={styles.filterContainer}>
          <Text>Filtering Options Here</Text>
          <FilterElement
            type="gender"
            switch={this.state.gender.switch}
            switchToggle={() => this.toggleSwitch('gender')}
            isVisible={this.state.gender.modal}
            onBackdropPress={() => this.toggleModal('gender')}
          >
            <FilterModal
              type="gender"
              isVisible={this.state.gender.modal}
              onBackdropPress={() => this.toggleModal('gender')}
              selectedItems={this.state.gender.values}
              onSelectChange={this.onSelectChange('gender')}
            />
          </FilterElement>
          <FilterElement
            type="age"
            switch={this.state.age.switch}
            switchToggle={() => this.toggleSwitch('age')}
            isVisible={this.state.age.modal}
            onBackdropPress={() => this.toggleModal('age')}
          >
            <FilterAge
              type="age"
              isVisible={this.state.age.modal}
              onBackdropPress={() => this.toggleModal('age')}
              values={this.state.age}
              onChange={this.onAgeChange()}
            />
          </FilterElement>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo,
});

const mapDispatchToProps = dispatch => ({
  fetchUserInfo: userID => dispatch(fetchUserInfo(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';

import cinder from '../theme/variables/cinder';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  container__view: {
    flex: 1,
    alignItems: 'center',
  },
  user__about: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%',
  },
  user__image: {
    height: 300,
    width: 300,
    flex: 1,
    borderRadius: cinder.cardBorderRadius,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  user__age: {
    fontStyle: 'italic',
    color: 'grey',
  },
  user__matched_date: {
    color: 'grey',
  },
  card: {
    alignItems: 'center',
    marginBottom: '2%',
  },
});

export default class UserDetails extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.state.params.userName,
    };
  }

  constructor(props) {
    super(props);

    const {
      userName, userBio, primaryPic, matchDate, userAge,
    } = this.props.navigation.state.params;

    this.state = {
      name: userName,
      bio: userBio,
      img: primaryPic,
      matchDate: new Date(matchDate).toISOString().split('T')[0],
      age: userAge,
    };
  }

  render() {
    return (
      <Container>
        <View style={styles.container__view}>
          <Content>
            <Card style={styles.card}>
              <CardItem header style={styles.header}>
                <Text style={styles.user__matched_date}> Matched on {this.state.matchDate}</Text>
              </CardItem>
              <CardItem>
                <Image style={styles.user__image} source={{ uri: this.state.img }} />
              </CardItem>
              <CardItem>
                <Text style={styles.user__age}>{this.state.name}, {this.state.age}</Text>
              </CardItem>
              <Text style={styles.user__about}>{this.state.bio}</Text>
            </Card>
          </Content>
        </View>
      </Container >
    );
  }
}

import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base';

import cinder from '../theme/variables/cinder';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
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
    paddingBottom: '5%',
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
});

export default class UserDetails extends Component {
  formatMatchDate() {
    return new Date(this.props.matchDate).toISOString().split('T')[0];
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header style={styles.header}>
              <Text style={styles.user__matched_date}> Matched on {this.props.matchDate ? this.formatMatchDate() : 'A lifetime ago.'}</Text>
            </CardItem>
            <CardItem>
              <Image style={styles.user__image} source={{ uri: this.props.primaryPic }} />
            </CardItem>
            <CardItem>
              <Text style={styles.user__age}>{this.props.userName}, {this.props.age}</Text>
            </CardItem>
            <Text numberOfLines={9} style={styles.user__about}>{this.props.userBio}</Text>
          </Card>
        </Content>
      </Container >
    );
  }
}

import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H1 } from 'native-base';

const userDetails = {
  currUserPic: 'https://gazettereview.com/wp-content/uploads/2017/11/ugly-god.jpg',
  currUserName: 'Ugly God'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
  	height: 100,
  	width: 100,
  	marginTop: 20,
  	borderRadius: 50
  },
  userName: {
  	marginTop:10
  }
});

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: userDetails.currUserPic}}/>
        <H1 style={styles.userName}>{userDetails.currUserName}</H1>
      </View>
    );
  }
}
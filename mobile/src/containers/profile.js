import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
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
  filterContainer: {
    marginTop: 40
  },
  userName: {
  	marginTop:10
  },
  lineStyle:{
        alignSelf: 'stretch',
        borderWidth: 0.5,
        borderColor:'grey',
        marginTop: 15,
        marginRight: 2,
        marginLeft: 2
  }
});

export default class Profile extends React.Component {
 
  static navigationOptions = {
     title: 'My Profile'
  }

  render() {
    return (
      <View style={styles.container}>
        <Image accessibilityLabel={'profile_image'} style={styles.image} source={{uri: userDetails.currUserPic}}/>
        <H1 accessibilityLabel={'profile_name'} style={styles.userName}>{userDetails.currUserName}</H1>
        <View style = {styles.lineStyle}/>
        <View style={styles.filterContainer}>
         <Text>Filtering Options Here</Text>
        </View>
      </View>

    );
  }
}
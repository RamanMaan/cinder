import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { Container, View, DeckSwiper, Card, CardItem, H3, Text, Icon, Button } from 'native-base';

import cinder from '../theme/variables/cinder';

const styles = StyleSheet.create({
  container__view: {
    flex: 1,
  },
  recommends__card: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  recommends_details: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    top: 500 - (29 + cinder.fontSizeBase),
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: cinder.cardBorderRadius,
    borderBottomRightRadius: cinder.cardBorderRadius,
  },
  recommends__details_text: {
    color: '#fff',
  },
  recommends__about: {
    maxHeight: 400,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  recommends__image: {
    height: 500,
    flex: 1,
    borderRadius: cinder.cardBorderRadius,
  },
  buttons__container: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 15,
  },
});

export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);

    this.setSwiper = this.setSwiper.bind(this);
    this.setScrollView = this.setScrollView.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderRecommendation = this.renderRecommendation.bind(this);
    this.renderButtons = this.renderButtons.bind(this);

    this.swiper = null;
    this.scrollView = null;

    this.animatedValue = new Animated.Value(0);

    this.state = {
      empty: !this.props.data || this.props.data.length === 0,
    };
  }

  componentDidMount() {
    this.animate();
  }

  setScrollView(ref) {
    this.scrollView = ref;
  }

  setSwiper(ref) {
    this.swiper = ref;
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
      }),
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
      }),
    ]).start(() => this.animate());
  }

  swipeRight() {
    this.onSwipe('like');
  }

  swipeLeft() {
    this.onSwipe('pass');
  }

  onSwipe(action) {
    // reset card to top of scroll view in case user scrolled previous card
    if (!this.swiper._root.state.lastCard) {
      this.scrollView.scrollTo({ y: 0 });
    } else {
      this.setState({ empty: true });
    }

    // this is the user object that was swiped on
    const swipedUser = this.swiper._root.state.selectedItem;
    this.props.onSwipe(action, swipedUser);
  }

  renderEmpty() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Text>No recommendations left! :(</Text>
      </View>
    );
  }

  renderRecommendation(item) {
    const bounce = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 3],
    });

    const scale = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    });

    return (
      <Card style={styles.recommends__card}>
        <ScrollView ref={this.setScrollView} style={{ flex: 1, maxHeight: 500, flexGrow: 0 }}>
          <Image style={styles.recommends__image} source={{ uri: item.primaryPic }} />
          <View style={styles.recommends_details}>
            <View style={{ flexDirection: 'row' }}>
              <Text bold style={styles.recommends__details_text}>{item.userName}</Text>
              <Text style={styles.recommends__details_text}>{`, ${item.age}`}</Text>
            </View>
            <Animated.View style={{ transform: [{ translateY: bounce }, { scale }] }}>
              <TouchableOpacity onPress={() => this.scrollView.scrollToEnd()}>
                <Icon name="ios-arrow-down" style={{ color: 'white', padding: 0, fontSize: 24 }} />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <CardItem details style={styles.recommends__about}>
            <H3>{`About ${item.userName.split(' ')[0]}`}</H3>
            <Text left>{item.userBio}</Text>
          </CardItem>
        </ScrollView>
      </Card>
    );
  }

  renderButtons() {
    const passBtn = () => {
      this.swiper._root.swipeLeft();
      this.swipeLeft();
    };

    const likeBtn = () => {
      this.swiper._root.swipeRight();
      this.swipeRight();
    };

    return (
      <View style={styles.buttons__container}>
        <Button danger rounded bordered iconLeft onPress={passBtn}>
          <Icon name="close" />
          <Text>Pass</Text>
        </Button>
        <Button primary rounded iconRight onPress={likeBtn}>
          <Text>Like</Text>
          <Icon name="heart" />
        </Button>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <View style={styles.container__view}>
          <DeckSwiper
            ref={this.setSwiper}
            looping={false}
            dataSource={this.props.data}
            renderEmpty={this.renderEmpty}
            renderItem={this.renderRecommendation}
            onSwipeLeft={() => this.swipeLeft()}
            onSwipeRight={() => this.swipeRight()}
          />
        </View>
        {this.state.empty ? null : this.renderButtons()}
      </Container>
    );
  }
}

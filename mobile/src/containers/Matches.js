import React from 'react';
import { Container } from 'native-base';
import { View } from 'react-native';

import MatchesList from '../components/MatchesList';

export default class Matches extends React.Component {
  openDetailsPage(match) {
    this.props.navigation.navigate('Details', { ...match });
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <View accessibilityLabel={'matches_list'}>
          <MatchesList openDetails={this.openDetailsPage.bind(this)} />
        </View>
      </Container>
    );
  }
}

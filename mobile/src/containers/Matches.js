import React from 'react';
import { Container } from 'native-base';

import MatchesList from '../components/MatchesList';

export default class Matches extends React.Component {
  openDetailsPage(match) {
    this.props.navigation.navigate('Details', { ...match });
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <MatchesList accessibilityLabel={'matches_list'} openDetails={this.openDetailsPage.bind(this)} />
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './styles/Matches.css';
import MatchesList from '../components/MatchesList';

class Matches extends Component {
  constructor(props) {
    super(props);

    this.fetchUserMatches = this.fetchUserMatches.bind(this);

    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    this.fetchUserMatches();
  }

  fetchUserMatches() {
    this.setState({
      matches: [
        {
          id: 0,
          title: 'Kendrick Lamar',
          subtitle: 'How u doin?',
          date: new Date().toJSON(),
          img: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg'
        },
        {
          id: 1,
          title: 'Mac Miller | Larry Fisherman | Delusional Thomas',
          subtitle:
            ';););) Want to meet hot new singles? Click this totally legit link: www.gethotsingles.com',
          date: new Date().toJSON(),
          img:
            'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b'
        },
        {
          id: 2,
          title: 'Ian Simpson',
          subtitle: 'What u wearin',
          date: new Date().toJSON(),
          img:
            'https://media.pitchfork.com/photos/592997c25e6ef9596931f65a/1:1/w_300/e2fc485c.jpg'
        },
        {
          id: 3,
          title: 'Kendrick Lamar',
          subtitle: 'How u doin?',
          date: new Date().toJSON(),
          img: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg'
        },
        {
          id: 4,
          title: 'Mac Miller | Larry Fisherman | Delusional Thomas',
          subtitle:
            ';););) Want to meet hot new singles? Click this totally legit link: www.gethotsingles.com',
          date: new Date().toJSON(),
          img:
            'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b'
        },
        {
          id: 5,
          title: 'Ian Simpson',
          subtitle: 'What u wearin',
          date: new Date().toJSON(),
          img:
            'https://media.pitchfork.com/photos/592997c25e6ef9596931f65a/1:1/w_300/e2fc485c.jpg'
        },
        {
          id: 6,
          title: 'Kendrick Lamar',
          subtitle: 'How u doin?',
          date: new Date().toJSON(),
          img: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg'
        },
        {
          id: 7,
          title: 'Mac Miller | Larry Fisherman | Delusional Thomas',
          subtitle:
            ';););) Want to meet hot new singles? Click this totally legit link: www.gethotsingles.com',
          date: new Date().toJSON(),
          img:
            'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b'
        }
      ]
    });
  }

  render() {
    return (
      <div className="Matches">
        <Container fluid>
          <Row className="full">
            <Col sm="4">
              <MatchesList matches={this.state.matches} />
            </Col>
            <Col sm="8">
              <h1>This is the Matches page</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Matches;

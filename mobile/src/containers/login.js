import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text } from 'react-native';
import { Container, H1, Content, Form, Item, Label, Input, Button } from 'native-base';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  userLogin() {
    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((res) => {
      // handle response here
      if (res.status === 200) {
        // all good
        // execute login here
      } else {
        // handle error here
        throw new Error(res.status);
      }
    }).catch(err => err);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <H1 center>cinder</H1>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={txt => this.setState({ email: txt })} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={txt => this.setState({ password: txt })} />
            </Item>
            <Button bordered primary block >
              <Text>Log In</Text>
            </Button>
            <Button bordered dark block>
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

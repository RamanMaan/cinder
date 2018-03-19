import React from 'react';
import { ListItem, Text, Left, Right, Body, Thumbnail } from 'native-base';

const dateFormat = date => new Date(date).toJSON().split('T')[0];

const MatchesListItem = ({
  userID, userName, userBio, primaryPic, matchDate, onPress,
}) => (
  <ListItem avatar onPress={onPress}>
    <Left>
      <Thumbnail source={{ uri: primaryPic }} style={{ resizeMode: 'contain' }} />
    </Left>
    <Body>
      <Text>{userName}</Text>
      <Text note numberOfLines={1}>{userBio}</Text>
    </Body>
    <Right>
      <Text note>{matchDate ? dateFormat(matchDate) : matchDate}</Text>
    </Right>
  </ListItem>
);

export default MatchesListItem;

import React from 'react';
import {
  Text,
  Spinner,
  Container,
  Content,
  View,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Button
} from 'native-base';
import {
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import userActionCreator from '../../../store/actionCreators/user';

const styles = StyleSheet.create({
    noFriendsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        paddingVertical: 5
    }
});

class AddFriends extends React.Component {
  componentDidMount() {
    this.props.userStoreActions.getAll();
  }

  renderList = () => {
    if (this.props.userStore.getAllSuccess.length === 0) {
      return (
        <View>
          <Text>Je hebt iedereen gevolgd 😳</Text>
        </View>
      );
    }

    return (
      <List>
          {this.props.userStore.getAllSuccess.map((user, i) =>
          <ListItem avatar key={i} style={styles.listItem}>
            <Left>
                <Thumbnail source={{ uri: user.avatar }} />
            </Left>
            <Body>
                <View>
                    <Text>{user.firstname} {user.lastname}</Text>
                </View>
            </Body>
            <Right>
              <Button onPress={() => this.props.userStoreActions.follow(user.username)}>
                <Text>VOLG</Text>
              </Button>
            </Right>
          </ListItem>
          )}
      </List>
    );
  }

  render() {
    if (!this.props.userStore.getAllSuccess) {
      return (
        <Spinner />
      );
    }

    return (
      <Container>
        <Content>
          {this.renderList()}
        </Content>
      </Container>
    )
  }
}

export default connect(
  state => ({
    userStore: state.user,
  }),
  dispatch => ({
    userStoreActions: userActionCreator(dispatch),
  }),
)(AddFriends);
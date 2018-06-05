import React from 'react';
import { 
    Container, 
    Header, 
    Content, 
    List, 
    ListItem, 
    Left, 
    Body, 
    Right, 
    Thumbnail, 
    Text,
    Spinner,
    View
} from 'native-base';
import { StyleSheet } from 'react-native';
import userActionCreator from '../../store/actionCreators/user';
import {
    connect
} from 'react-redux';

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

class Friends extends React.Component {
    componentDidMount() {
        this.props.userActions.getAll();
    }

    renderList = () => {
        if (this.props.userState.getAllSuccess.length === 0) {
            return (
                <Container style={styles.noFriendsContainer}>
                    <Text>Je bent echt een kansloos mannetje</Text>
                </Container>
            );
        }

        return (
            <List>
                {this.props.userState.getAllSuccess.map((user, i) =>
                <ListItem avatar key={i} style={styles.listItem}>
                <Left>
                    <Thumbnail source={{ uri: user.avatar }} />
                </Left>
                <Body>
                    <View>
                        <Text>{user.firstname} {user.lastname}</Text>
                        <Text note>{user.bio}</Text>
                    </View>
                </Body>
                {/* <Right>
                    <Text note>IETS</Text>
                </Right> */}
                </ListItem>
                )}
            </List>
        );
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    {this.props.userState.getAllSuccess ?
                    this.renderList()
                    :
                    <Spinner />
                    }
                </Content>
            </Container>
        );
    }
}

export default connect(
    state => ({
        userState: state.user
    }),
    dispatch => ({
        userActions: userActionCreator(dispatch)
    })
)(Friends);
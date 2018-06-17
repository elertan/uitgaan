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
import { StyleSheet, RefreshControl } from 'react-native';
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

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.userActions.getAllFriends();

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userState.getAllFriends !== nextProps.userState.getAllFriends) {
            this.setState({ refreshing: false });
        }
    }

    componentDidMount() {
        this.props.userActions.getAllFriends();
    }

    renderList = () => {
        if (this.props.userState.getAllFriends.length === 0) {
            return (
                <Container style={styles.noFriendsContainer}>
                    <Text>Je bent nog steeds vriendloos!</Text>
                    <Text style={{ textAlign: 'center' }}>Je kan vrienden toevoegen door op het icoontje rechtsbovenin te drukken</Text>
                </Container>
            );
        }

        return (
            <List>
                {this.props.userState.getAllFriends.map((user, i) =>
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
                <Content refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="Refreshing..."
                    />
                }>
                    {this.props.userState.getAllFriends ?
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
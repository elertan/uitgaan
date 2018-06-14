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
        this.props.userActions.getAll();

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userState.getAllSuccess !== nextProps.userState.getAllSuccess) {
            this.setState({ refreshing: false });

        }

    }

    componentDidMount() {
        this.props.userActions.getAll();
    }

    renderList = () => {
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
                <Content refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="Refreshing..."
                    />
                }>
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
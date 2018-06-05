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
    Spinner
} from 'native-base';
import userActionCreator from '../../store/actionCreators/user';
import {
    connect
} from 'react-redux';

class Friends extends React.Component {
    componentDidMount() {
        this.props.userActions.getAll();
    }

    renderList = () => {
        return (
            <List>
                {this.props.userState.getAllSuccess.map((user, i) =>
                <ListItem avatar key={i}>
                <Left>
                    <Thumbnail source={{ uri: user.avatar }} />
                </Left>
                <Body>
                    <Text>{user.firstname} {user.lastname}</Text>
                    <Text note>{user.bio}</Text>
                </Body>
                <Right>
                    <Text note>IETS</Text>
                </Right>
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
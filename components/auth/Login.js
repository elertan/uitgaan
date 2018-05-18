import React from 'react';
import { connect } from 'react-redux';
import userActionCreator from '../../store/actionCreators/user';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
} from 'native-base';

const styles = StyleSheet.create({
    formItem: {
        marginVertical: 15
    },
    loginButton: {
        marginTop: 25
    }
});

class Login extends React.Component {
    state = {
        username: '',
        usernameError: undefined,
        password: '',
        passwordError: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.userStore.user !== this.props.userStore.user) {
            alert('Welcome, ' + nextProps.userStore.user.name);
        }
    }

    handleLogin = () => {
        this.props.userActions.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item style={styles.formItem}>
                            <Input 
                                placeholder="Gebruikersnaam"
                                value={this.state.username}
                                onChangeText={text => this.setState({ username: text })}
                            />
                        </Item>
                        <Item style={styles.formItem}>
                            <Input 
                                placeholder="Wachtwoord" 
                                secureTextEntry 
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                            />
                        </Item>
                        <Button
                            style={styles.loginButton}
                            full 
                            primary
                            large
                            disabled={this.props.userStore.isLoggingIn || !this.state.username || !this.state.password}
                            onPress={this.handleLogin}
                        >
                            <Text>Inloggen</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        userStore: state.user
    }),
    (dispatch) => ({
        userActions: userActionCreator(dispatch)
    })
)(Login);
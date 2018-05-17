import React from 'react';
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

export default class Login extends React.Component {
    state = {
        username: '',
        usernameError: undefined,
        password: '',
        passwordError: undefined,
        isAttemptingLogin: false,
    };

    handleLogin = () => {
        this.setState({isAttemptingLogin: true});
        setTimeout(() => {
            alert('Tering slome nep api, hier komt login zooi, voor nu matsen we je');
            this.setState({isAttemptingLogin: false});
        }, 2000);
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
                            disabled={this.state.isAttemptingLogin || !this.state.username || !this.state.password}
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
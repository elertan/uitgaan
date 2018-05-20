import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    Text
} from 'native-base';
import {
    username as validateUsername,
    password as validatePassword,
    passwordAgain as validatePasswordAgain
} from '../../../input-validation/common';
import ValidationManager from '../../../input-validation/ValidationManager';
import { TextField } from 'react-native-material-textfield';

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 26,
        textAlign: 'center',
        marginVertical: 20,
        color: '#111'
    },
    motivationalText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        color: '#555',
        marginBottom: 15
    },
    progressStepperContainer: {
        marginTop: 20, 
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between',
    }
});

export default class Account extends React.Component {
    static propTypes = {
        onNext: PropTypes.func.isRequired,
        data: PropTypes.object
    };

    state = {
        username: '',
        password: '',
        passwordAgain: '',
        validationManager: new ValidationManager(['username', 'password', 'passwordAgain'])
    };

    componentDidMount() {
        if (this.props.data) {
            this.setState(Object.assign(this.props.data, { validationManager: new ValidationManager() }));
        }
    }

    mayProceed = () => {
        return this.state.validationManager.isValidSubset(['username', 'password', 'passwordAgain']);
    }

    handleProceed = () => {
        const data = {
            username: this.state.username,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain
        };
        this.props.onNext(data);
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.welcomeText}>Account</Text>
                <Text style={styles.motivationalText}>Het laatste wat we willen van je, beloofd.</Text>
                <TextField 
                    label="Gebruikersnaam"
                    autoCapitalize='none'
                    value={this.state.username}
                    onBlur={() => this.setState({ validationManager: this.state.validationManager.enableFeedback('username') })}
                    error={this.state.validationManager.getError('username')}
                    onChangeText={username => this.setState({ username, validationManager: this.state.validationManager.setError('username', validateUsername(username)) })}
                />
                <TextField 
                    label="Wachtwoord"
                    secureTextEntry
                    value={this.state.password}
                    onBlur={() => this.setState({ validationManager: this.state.validationManager.enableFeedback('password') })}
                    error={this.state.validationManager.getError('password')}
                    onChangeText={password => this.setState({ password, validationManager: this.state.validationManager.setError('password', validatePassword(password)).setError('passwordAgain', validatePasswordAgain(password, this.state.passwordAgain)) })}
                />
                <TextField 
                    label="Wachtwoord Overnieuw"
                    secureTextEntry
                    value={this.state.passwordAgain}
                    onBlur={() => this.setState({ validationManager: this.state.validationManager.enableFeedback('passwordAgain') })}
                    error={this.state.validationManager.getError('passwordAgain')}
                    onChangeText={passwordAgain => this.setState({ passwordAgain, validationManager: this.state.validationManager.setError('passwordAgain', validatePasswordAgain(this.state.password, passwordAgain)) })}
                />
                <View style={styles.progressStepperContainer}>
                    <Button
                        onPress={this.props.onBack}
                        danger
                    >
                        <Text>Vorige</Text>
                    </Button>
                    <Button
                        disabled={!this.mayProceed()}
                        onPress={this.handleProceed}
                    >
                        <Text>Maak Aan!</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
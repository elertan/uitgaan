import React from 'react';
import { connect } from 'react-redux';
import userActionCreator from '../../store/actionCreators/user';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Container,
    View,
    Input,
    Button,
    Text,
} from 'native-base';
import { TextField } from 'react-native-material-textfield';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';

import {
    firstname as validateFirstname,
    lastname as validateLastname
} from '../../input-validation/common';
import ValidationManager from '../../input-validation/ValidationManager';

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

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        passwordAgain: '',
        firstname: '',
        lastname: '',
        dateOfBirth: undefined,
        validationManager: new ValidationManager(['firstname', 'lastname'])
    };

    componentWillReceiveProps(nextProps) {
        // if (nextProps.userStore.loginError !== this.props.userStore.loginError) {
        //     alert(nextProps.userStore.loginError.message);
        // }
    }

    handleRegister = () => {
        // this.props.userActions.login(this.state.username, this.state.password);
    }

    mayProceedWelcome = () => {
        return this.state.validationManager.isValidSubset(['firstname', 'lastname']);
    }

    maySubmit = () => {
        return (
            this.state.username && this.state.username.length > 5 &&
            this.state.password && this.state.password.length > 5 &&
            this.state.firstname && this.state.firstname.length > 1 &&
            this.state.lastname && this.state.lastname.length > 1 &&
            this.state.dateOfBirth //&& moment(this.state.dateOfBirth)
        );
    }

    render() {
        return (
            <Container>
                <Text style={styles.welcomeText}>Welkom aan boord!</Text>
                <Text style={styles.motivationalText}>Vertel ons een beetje over wie je bent.</Text>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={styles.inputContainer}>
                        <TextField 
                            label="Voornaam"
                            value={this.state.firstname}
                            onBlur={() => this.setState({ validationManager: this.state.validationManager.enableFeedback('firstname') })}
                            error={this.state.validationManager.getError('firstname')}
                            onChangeText={firstname => this.setState({ firstname, validationManager: this.state.validationManager.setError('firstname', validateFirstname(firstname)) })}
                        />
                        <TextField 
                            label="Achternaam"
                            value={this.state.lastname}
                            onBlur={() => this.setState({ validationManager: this.state.validationManager.enableFeedback('lastname') })}
                            error={this.state.validationManager.getError('lastname')}
                            onChangeText={lastname => this.setState({ lastname, validationManager: this.state.validationManager.setError('lastname', validateFirstname(lastname)) })}
                        />
                        <View style={styles.progressStepperContainer}>
                            <Button
                                disabled
                            >
                                <Text>Vorige</Text>
                            </Button>
                            <Button
                                disabled={!this.mayProceedWelcome()}
                            >
                                <Text>Volgende</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ marginBottom: 50 }}>
                        <StepIndicator
                            currentPosition={0}
                            labels={['Welkom', 'Profiel', 'Overig', 'Account', 'Klaar!']}
                        />
                    </View>
                </View>
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
)(Register);
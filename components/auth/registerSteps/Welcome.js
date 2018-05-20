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
    firstname as validateFirstname,
    lastname as validateLastname
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

export default class Welcome extends React.Component {
    static propTypes = {
        onNext: PropTypes.func.isRequired,
        data: PropTypes.object
    };

    state = {
        firstname: '',
        lastname: '',
        validationManager: new ValidationManager(['firstname', 'lastname'])
    };

    componentDidMount() {
        if (this.props.data) {
            this.setState(Object.assign(this.props.data, { validationManager: new ValidationManager() }));
        }
    }

    mayProceed = () => {
        return this.state.validationManager.isValidSubset(['firstname', 'lastname']);
    }

    handleProceed = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        };
        this.props.onNext(data);
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.welcomeText}>Welkom aan boord!</Text>
                <Text style={styles.motivationalText}>Vertel ons een beetje over wie je bent.</Text>
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
                    <View />
                    <Button
                        disabled={!this.mayProceed()}
                        onPress={this.handleProceed}
                    >
                        <Text>Volgende</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
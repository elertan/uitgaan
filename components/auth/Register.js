import React from 'react';
import { connect } from 'react-redux';
import userActionCreator from '../../store/actionCreators/user';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Container,
    View,
    Input,
    Button,
    Text,
} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';

import IndexViewRenderer from '../reusable/IndexViewRenderer';
import WelcomeStep from './registerSteps/Welcome';
import ProfileStep from './registerSteps/Profile';
import AccountStep from './registerSteps/Account';
import FinishedStep from './registerSteps/Finished';

// const styles = StyleSheet.create({
// });

const labels = ['Welkom', 'Profiel', 'Account', 'Klaar!'];

class Register extends React.Component {
    state = {
        data: {},
        stepIndex: 0,
        username: '',
        password: '',
        passwordAgain: '',
        dateOfBirth: undefined,
    };

    componentWillReceiveProps(nextProps) {
        // if (nextProps.userStore.loginError !== this.props.userStore.loginError) {
        //     alert(nextProps.userStore.loginError.message);
        // }
    }

    handleRegister = () => {
        // this.props.userActions.login(this.state.username, this.state.password);
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

    handleNext = (data) => {
        this.setState({
            data: Object.assign(this.state.data, data),
            stepIndex: this.state.stepIndex + 1
        });
    }

    handleBack = () => this.setState({ stepIndex: this.state.stepIndex - 1 });

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={StyleSheet.absoluteFill}>
            <Container>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <IndexViewRenderer index={this.state.stepIndex}>
                        <WelcomeStep 
                            onNext={this.handleNext} 
                            data={this.state.data} 
                        />
                        <ProfileStep 
                            onNext={this.handleNext} 
                            onBack={this.handleBack}
                            data={this.state.data}
                        />
                        <AccountStep 
                            onNext={this.handleNext}
                            onBack={this.handleBack}
                            data={this.state.data}
                        />
                        <FinishedStep
                            onBack={this.handleBack}
                            data={this.state.data}
                        />
                    </IndexViewRenderer>
                    <View style={{ marginBottom: 25 }}>
                        <StepIndicator
                            customStyles={{
                                separatorFinishedColor: '#1692ff',
                                separatorUnFinishedColor: '#77bfff',
                                stepIndicatorUnFinishedColor: '#77bfff',
                                stepIndicatorFinishedColor: '#1692ff',
                                stepStrokeCurrentColor: '#1692ff',
                                stepIndicatorLabelCurrentColor: '#1692ff',
                                currentStepLabelColor: '#1692ff',
                                currentStepIndicatorLabelFontSize: 18,
                            }}
                            currentPosition={this.state.stepIndex}
                            labels={labels}
                            stepCount={labels.length}
                        />
                    </View>
                </View>
            </Container>
            </TouchableWithoutFeedback>
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
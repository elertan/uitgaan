import React from 'react';
import { connect } from 'react-redux';
import createUserActions from '../../../store/actionCreators/user';
import {
    Text,
    View,
    Button,
} from 'native-base';
import Loader from '../../reusable/Loader';
import {
    Animated,
    Easing,
    StyleSheet
} from 'react-native';
import { DangerZone } from 'expo';
let { Lottie } = DangerZone;

class Finished extends React.Component {
    state = {
        fadeAnim: new Animated.Value(1),
        successAnim: new Animated.Value(0),
        buttonAnim: new Animated.Value(0),
        isLoading: true
    }

    componentDidMount() {
        setTimeout(() => { 
            Animated.timing(this.state.fadeAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.ease
            }).start(() => {
                this.setState({isLoading: false});
                Animated.timing(this.state.successAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.ease
                }).start(() => {
                    Animated.timing(this.state.buttonAnim, {
                        toValue: 1, 
                        duration: 300,
                        easing: Easing.ease
                    }).start();
                });
            });
        }, 2500);
    }

    render() {
        return (
            <View>
                {this.state.isLoading ?
                <Animated.View style={{ height: '100%', opacity: this.state.fadeAnim }}>
                    <Loader />
                </Animated.View>
                :
                <View>
                    <Text style={{ fontSize: 26, textAlign: 'center', marginTop: 25 }}>Gelukt!</Text>
                    <Lottie
                        style={{ width: '100%', height: 300 }}
                        source={require('../../../assets/animations/success.json')}
                        autoPlay
                        progress={this.state.successAnim}
                    />
                    <Animated.View 
                        style={{ opacity: this.state.buttonAnim, marginTop: 100 }}
                    >
                        <Button
                            primary
                            full
                            style={{ marginHorizontal: 20, borderRadius: 5 }}
                        >
                            <Text>Ga naar mijn UitGAAN!</Text>
                        </Button>
                    </Animated.View>
                </View>
                }
            </View>
        );
    }
}

export default connect(state => ({
    userStore: state.user
}), dispatch => ({
    userActions: createUserActions(dispatch)
}))(Finished);
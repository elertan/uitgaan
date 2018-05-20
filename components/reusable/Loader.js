import React from 'react';
import {
    View,
    Animated,
    Easing,
} from 'react-native';
import { DangerZone } from 'expo';
let { Lottie } = DangerZone;

export default class Loader extends React.Component {
    state = {
        progress: new Animated.Value(0)
    };

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.progress, {
                toValue: 1,
                duration: 2500,
                easing: Easing.linear,
            })
        ).start();
    }

    render() {
        return (
            <View>
                <Lottie 
                    style={{ width: '100%', height: '100%', backgroundColor: 'rgb(72, 48, 105)' }}
                    source={require('../../assets/animations/drink.json')}
                    autoPlay
                    progress={this.state.progress}
                />
            </View>
        );
    }
}
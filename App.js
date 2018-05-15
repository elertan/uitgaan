import React from 'react';
import {
    Container,
    Text,
} from 'native-base';
import { 
    StatusBar, 
    Platform, 
} from 'react-native';
import Expo, { AppLoading } from 'expo';

import Root from './components/Root';

export default class App extends React.Component {
    state = {
        isLoading: true
    };

    async _loadAssetsAsync() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        if (Platform.OS === 'android') {
            StatusBar.setHidden(true);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <AppLoading 
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isLoading: false })}
                    onError={console.warn}
                />
            );
        }

        return (
            <Container>
                <Root />
            </Container>
        );
    }
}
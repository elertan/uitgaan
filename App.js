import React from 'react';
import {
    Container,
    Text,
} from 'native-base';
import { 
    StatusBar, 
    Platform, 
} from 'react-native';
import AppLoader from './components/utils/AppLoader';
import {
    LandingNavigator,
    HomeNavigator,
} from './components/routes';

export default class App extends React.Component {
    state = {
        user: undefined, // aka niet ingelod
    }

    render() {
        return (
            <AppLoader>
                {this.state.user ?
                <Home />
                :    
                <LandingNavigator />
                }
            </AppLoader>
        );
    }
}
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Landing from './Landing';
import Login from './auth/Login';
import Register from './auth/Register';

export const LandingNavigator =  createStackNavigator({
    Landing: {
        screen: Landing,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Log In'
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Registreer'
        }
    },
}, {
    initialRouteName: 'Landing',
    headerMode: 'screen'
});
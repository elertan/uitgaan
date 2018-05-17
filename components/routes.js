import React from 'react';
import { 
    createStackNavigator,
    TabNavigator,
} from 'react-navigation';

// Landing
import LandingScreen from './Landing';
import LoginScreen from './auth/Login';
import RegisterScreen from './auth/Register';

// Home
import HomeScreen from './Home';

export const LandingNavigator = createStackNavigator({
    Landing: {
        screen: LandingScreen,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Log In'
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            title: 'Registreer'
        }
    },
}, {
    initialRouteName: 'Landing',
    headerMode: 'screen'
});

export const HomeNavigator = TabNavigator({
    Home: {
        screen: HomeScreen
    },
});
import React from 'react';
import { 
    createStackNavigator,
} from 'react-navigation';
import createMaterialBottomTabNavigator from 'react-navigation-material-bottom-tabs/createMaterialBottomTabNavigator';

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

export const HomeNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        title: 'Evenementen',
        tabBarColor: '#F44336',
    },
    Home1: {
        screen: HomeScreen,
        title: 'Profiel',
        tabBarColor: '#1c73ff',
    },
    Home2: {
        screen: HomeScreen,
        title: 'Iets',
        tabBarColor: '#1cff98',
    },
});
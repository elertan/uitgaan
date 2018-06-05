import React from 'react';
import { 
    createStackNavigator,
} from 'react-navigation';

import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
import createMaterialBottomTabNavigator from 'react-navigation-material-bottom-tabs/createMaterialBottomTabNavigator';

import { Icon } from 'react-native-elements';

// Landing
import LandingScreen from './Landing';
import LoginScreen from './auth/Login';
import RegisterScreen from './auth/Register';

// Home
import EventsScreen from './Main/Events';
import ProfileScreen from './Main/Profile';
import FriendsScreen from './Main/Friends';
//Add event
import newEventScreen from './Main/newEventScreen';

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
export const eventsNavigator = createStackNavigator({
    Events: {
        screen: EventsScreen,
        navigationOptions: {
            title: 'Evenementen',
            headerRight: <Icon name='add' onPress={() => this.props.navigation.navigate('newEvent')} />,
        },
    },
    newEvent: {
        screen: newEventScreen,
        navigationOptions: {
            title: 'Nieuw Evenementen',
            headerLeft: <Icon name={'chevron-left'} onPress={() => this.props.navigate('Events')} />,
        },
    },
});
export const HomeNavigator = createMaterialBottomTabNavigator({
    Events: {
        screen: eventsNavigator,
        navigationOptions: {
            title: 'Evenementen',
            tabBarColor: '#F44336',
            tabBarIcon: (state) => <Icon name="event" color="#FFF" />
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            title: 'Profiel',
            tabBarColor: '#1c73ff',
            tabBarIcon: (state) => <Icon name="person" color="#FFF" />
        }
    },
    Friends: {
        screen: FriendsScreen,
        navigationOptions: {
            title: 'Vrienden',
            tabBarColor: '#17d32d',
            tabBarIcon: (state) => <Icon name="people" color="#FFF" />
        }
    },
}, {
    shifting: true,
    activeTintColor: '#e91e63',
    labelStyle: {
        fontSize: 12,
    },
    style: {
        backgroundColor: 'blue',
    },
    initialRouteName: 'Profile'
});


import React from 'react';
import { 
    createStackNavigator,
} from 'react-navigation';

import {StyleSheet} from 'react-native';
import {Button,View,Input,Text} from 'native-base';
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

import AddFriendsScreen from './Main/Friends/AddFriends';
//Add event
import newEventScreen from './Main/newEventScreen';

//Profile edite
import EditeProfile from './Main/EditProfile';

//functions in title
import shareApp from './reusable/shareApp';
import HeaderSearch from './Main/Components/HeaderSearch';


const styles = StyleSheet.create({
    topButton:{
        backgroundColor:'transparent',
        marginRight:20,
        
    },
    view:{
        padding:5,
        marginRight:5,
        marginLeft: 5,
    },
    headerSearch:{
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:17,
        paddingLeft:20,
        paddingRight: 20,
    },

});

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

export const FriendsNavigator = createStackNavigator({
    friends: {
        screen: FriendsScreen,
        navigationOptions: ({ navigation }) => ({
            //header: null,
            headerStyle: {
                backgroundColor: '#17d32d',
            },
            headerTintColor: '#fff',
            headerLeft: <View style={{ margin: 5, marginLeft: 15 }}><Icon name="share" color='#fff' onPress={() => shareApp()} size={25}/></View>,
            headerRight:
            <View style={{ margin: 5, marginRight: 15 }}>
                <Icon name="add" color='#fff' size={30} onPress={() => navigation.navigate('addFriends')} />
            </View>,
            title: 'Wie Jij Volgt',
            headerBackTitle: 'Back',
        }),
    },
    addFriends: {
        screen: AddFriendsScreen,
        navigationOptions: {
            title: 'Volg anderen',
        }
    }
});

export const eventsNavigator = createStackNavigator({
    Events: {
        screen: EventsScreen,
        navigationOptions: ({navigation}) => ({
            //header: null,
            headerStyle: {
                backgroundColor: '#F44336',
            },
            headerTintColor:'#fff',
            headerRight: <View style={{ margin: 5, marginRight: 15 }}>
                <Icon
                    name="add"
                    color='#fff'
                    onPress={() => navigation.navigate('newEvent')}
                    size={30}
                />
            </View>,
            title: <HeaderSearch />,
            headerBackTitle: 'Back',
        }),
    },
    newEvent: {
        screen: newEventScreen,
        navigationOptions: ({ navigation }) => ( {
            headerStyle: {
                backgroundColor:'#F44336',
            },
            headerTintColor:'#fff',
            title: 'Nieuw Evenement',
        }),
    },
});

export const ProfileNavigator = createStackNavigator({
    myProfile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
            headerBackTitle: 'Back',
        },
    },
    editeProfile: {
        screen: EditeProfile,
        navigationOptions: {
            //headerTintColor: '#fff',
            title: 'Bewerk profiel',
            backgroundColor:"#6a51ae"
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
        screen: ProfileNavigator,
        navigationOptions: {
            title: 'Profiel',
            tabBarColor: '#1c73ff',
            tabBarIcon: (state) => <Icon name="person" color="#FFF" />
        }
    },
    Friends: {
        screen: FriendsNavigator,
        navigationOptions: {
            title: 'Wie Jij Volgt',
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
    initialRouteName: 'Events'
});


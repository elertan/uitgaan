import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Text,
} from 'native-base';
import { 
    StatusBar, 
    Platform, 
} from 'react-native';
import AppLoader from './utils/AppLoader';
import {
    LandingNavigator,
    HomeNavigator,
} from './routes';
import userActionCreator from '../store/actionCreators/user';

class Root extends React.Component {
    render() {
        return (
            <AppLoader>
                {this.props.userStore.user ?
                <HomeNavigator />
                :    
                <LandingNavigator />
                }
            </AppLoader>
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
)(Root);
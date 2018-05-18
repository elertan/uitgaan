import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    View,
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
    componentDidMount() {
        this.props.userActions.checkForSavedUser();
    }

    render() {
        if (!this.props.userStore.hasCheckedForSavedUser) {
            return (
                <AppLoader>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Opgeslagen informatie laden...</Text>
                    </View>
                </AppLoader>
            );
        }

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
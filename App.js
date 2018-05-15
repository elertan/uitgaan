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
import Root from './components/Root';

export default class App extends React.Component {
    render() {
        return (
            <AppLoader>
                <Container>
                    <Root />
                </Container>
            </AppLoader>
        );
    }
}
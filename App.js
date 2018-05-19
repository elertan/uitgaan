import React from 'react';
import Root from './components/Root';
import {
    Provider
} from 'react-redux';
import {
    StyleProvider,
} from 'native-base';
import configureStore from './store/configureStore';
import getTheme from './native-base-theme/components';   

const store = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme()}>
                    <Root />
                </StyleProvider>
            </Provider>
        );
    }
}

export default App;
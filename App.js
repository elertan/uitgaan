import React from 'react';
import Root from './components/Root';
import {
    Provider
} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

export default App;
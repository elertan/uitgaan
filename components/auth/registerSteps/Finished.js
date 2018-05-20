import React from 'react';
import { connect } from 'react-redux';
import createUserActions from '../../../store/actionCreators/user';
import {
    Text,
    View,
} from 'native-base';

class Finished extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.userActions.login('bull11', 'shit11');
        }, 1500);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 26 }}>Klaar!</Text>
            </View>
        );
    }
}

export default connect(state => ({
    userStore: state.user
}), dispatch => ({
    userActions: createUserActions(dispatch)
}))(Finished);
import React from 'react';

import { StyleSheet, TextInput} from 'react-native';
import { Button, View, Input, Text ,Icon,Item} from 'native-base';
import { connect } from 'react-redux';
import eventsActions from '../../../store/actionCreators/event';

const styles = StyleSheet.create({
    headerSearch: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 17,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        height: '100%',
    },

});

class HeaderSearch extends React.Component {
    state = {
        searchInput: '',
    }


    timeoutID;

    delayedSearch = () => {
        this.clearSearchDelay();
        this.timeoutID = setTimeout(this.performSearch, 800);
    }

    performSearch = () => {
        console.log("start searching");
        this.props.eventActions.getEventsFiltered(this.state.searchInput);
    }

    clearSearchDelay = () => {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
    }

    handleOnChangeText = (text) => {
        this.setState({ searchInput: text });
        this.delayedSearch();
    }

    render() {
        return (
            <View style={{
                paddingTop: 3,
                paddingBottom: 3,
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Input
                    placeholderTextColor="white" 
                    style={styles.headerSearch} 
                    placeholder="Zoek evenementen..."
                    onChangeText={this.handleOnChangeText}
                    value={this.state.searchInput}
                />
                {
                    this.state.searchInput !== '' &&
                    <View style={{ marginTop: 8, marginLeft: 5 }}>
                        <Icon 
                            name='close-circle' 
                            style={{ fontSize: 18 }} 
                            onPress={() => this.handleOnChangeText('')}
                        />
                    </View>
                }
            </View>);
    }

}

export default connect(state => ({
    eventStore: state.event
}), dispatch => ({
    eventActions: eventsActions(dispatch)
}))(HeaderSearch);


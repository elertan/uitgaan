import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, View, Input, Text } from 'native-base';
import { connect } from 'react-redux';
import eventsActions from '../../../store/actionCreators/event';

const styles = StyleSheet.create({
    headerSearch: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 17,
        paddingLeft: 20,
        paddingRight: 20,
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
        if (this.timeoutID){
            clearTimeout(this.timeoutID);
        }
    }

    handleOnChangeText = (text) => {
      this.setState({searchInput:text});
      this.delayedSearch();
    }

    render() {
        return (
            <View style={{ paddingTop: 5, paddingBottom: 5, }}>
                <Input placeholderTextColor="white" style={styles.headerSearch} placeholder="Zoek evenementen..." 
                onChangeText={this.handleOnChangeText}/>
            </View>);
    }

}

export default connect(state => ({
    eventStore: state.event
}), dispatch => ({
    eventActions: eventsActions(dispatch)
}))(HeaderSearch);


import React from 'react';
import { RefreshControl} from 'react-native';
import eventsActions from '../../store/actionCreators/event';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import {
    View,
    Text,
    Content,
    Card,
    Badge,
    List,
    Spinner,
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
     _onRefresh() {
        this.setState({ refreshing: true });
        this.props.eventActions.getEvents();
        
    }

    componentWillReceiveProps(nextProps){
        if(this.props.eventStore.events !== nextProps.eventStore.events){
            this.setState({ refreshing: false });
            
        }
        
    }

    componentDidMount() {
        this.props.eventActions.getEvents();
    }
    render() {
        return (
                <Content refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="Refreshing..."
                    />
                }>

                    <List>
                        {this.renderListItem()}
                    </List>
                </Content>
        );
    }
    renderListItem = () => {
        const allEvents = this.props.eventStore.filteredEvents || this.props.eventStore.events;

        if (allEvents) {
            return allEvents.map((event) => {
                return (
                    <Card 
                        key={event._id}
                    >
                        <TouchableOpacity onPress={() => { 
                            this.props.navigation.push('detail', event); 
                        }}>
                            <Image style={{width: '100%', height: 200}} source={{uri: event.image}}/>
                            <View style={{padding: 8}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{event.name}</Text>
                                <Text note>{event.description}</Text>
                            </View>
                            <Badge info style={{position: 'absolute', right: 0, margin: 4}}>
                                <Text>€ {event.price / 100}</Text>
                            </Badge>
                        </TouchableOpacity>
                    </Card>
                )
              })
        } else {
            return <View><Spinner /></View>
        }
    }
}

const styles = StyleSheet.create({
    topButton:{
        backgroundColor:'transparent',
        marginRight:20,
        
    }
});

export default connect(state => ({
    eventStore: state.event
}), dispatch => ({
    eventActions: eventsActions(dispatch)
}))(Events);
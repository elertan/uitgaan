import React from 'react';
import eventsActions from '../../store/actionCreators/event';
import { connect } from 'react-redux';
import {
    Container,
    View,
    Text,
    Content,
    Card,
    Badge,
    List,
} from 'native-base';
import { Image } from 'react-native';

class Events extends React.Component {
    componentDidMount() {
        this.props.eventActions.getEvents();
    }
    render() {
        return (
            <Content>
                <List>
                    {this.renderListItem()}
                </List>
            </Content>
        );
    }

    renderListItem = () => {
        const allEvents = this.props.eventStore.events;

        if (allEvents) {
            return allEvents.map((event) => {
                return (
                    <Card key={event._id}>
                        <Image style={{width: '100%', height: 200}} source={{uri: event.image}}/>
                        <View style={{padding: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{event.name}</Text>
                            <Text note>{event.description}</Text>
                            <Badge info>
                                <Text>€ {event.price / 100}</Text>
                            </Badge>
                        </View>
                    </Card>
                )
              })
        } else {
            return <View><Text>Loading..</Text></View>
        }
    }
}

export default connect(state => ({
    eventStore: state.event
}), dispatch => ({
    eventActions: eventsActions(dispatch)
}))(Events);
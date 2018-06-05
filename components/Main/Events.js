import React from 'react';
import { RefreshControl} from 'react-native';
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
        const allEvents = this.props.eventStore.events;

        if (allEvents) {
            return allEvents.map((event) => {
                return (
                    <Card key={event._id}>
                        <Image style={{width: '100%', height: 200}} source={{uri: event.image}}/>
                        <View style={{padding: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{event.name}</Text>
                            <Text note>{event.description}</Text>
                        </View>
                        <Badge info style={{position: 'absolute', right: 0, margin: 4}}>
                            <Text>€ {event.price / 100}</Text>
                        </Badge>
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
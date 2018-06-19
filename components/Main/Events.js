import React from 'react';
import { RefreshControl} from 'react-native';
import eventsActions from '../../store/actionCreators/event';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import {
    Container,
    View,
    Text,
    Content,
    Input,
    Card,
    Badge,
    Button,
    Title,
    List,
    Spinner,
    Left, 
    Body, 
    Right,
    Header,
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
        const allEvents = this.props.eventStore.filteredEvents || this.props.eventStore.events;
        
        if (allEvents) {
            return allEvents.map((event) => {
                const fromDate = moment(event.from).format('DD-MM-YYYY');
                const tillDate = moment(event.till).format('DD-MM-YYYY');
                return (
                    <Card key={event._id}>
                        <Image style={{width: '100%', height: 200}} source={{uri: event.image}}/>
                        <View style={{padding: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{event.name}</Text>
                            <Text note>{event.description}</Text>
                        </View>
                        <View style={{position: 'absolute', left: 0, margin: 4}}>
                            <Badge info style={{marginBottom: 4}}>
                                <Text>Van: {fromDate}</Text>
                            </Badge>
                            <Badge info>
                                <Text>Tot: {tillDate}</Text>
                            </Badge>
                        </View>
                        <Badge info style={{position: 'absolute', right: 0, margin: 4}}>
                            <Text>€ {event.price / 100}</Text>
                        </Badge>
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
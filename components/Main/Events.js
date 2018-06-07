import React from 'react';
import { RefreshControl} from 'react-native';
import eventsActions from '../../store/actionCreators/event';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
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
                <Header searchBar rounded style={{backgroundColor: '#F44336'}}>
                    <Left>
                        <Icon name={'search'} color="#FFF" style={{marginLeft: 4, marginRight: 4}} />
                    </Left>
                    <Body style={{flexDirection: 'row', flex: 4, marginLeft: 4}}>
                        <Input style={{backgroundColor: '#ed7971', width: '100%', borderRadius: 10, marginTop: 4, marginBottom: 4}} placeholderTextColor="white" placeholder="Zoek evenementen..." />
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon size={36} name='add' color="#FFF" style={styles.topButton} onPress={() => navigation.navigate('newEvent')} />
                        </Button>
                    </Right>
                </Header>
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
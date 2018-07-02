import React from 'react';
import { Container, Content, Text, View, Button } from 'native-base';
import { Image } from 'react-native';
import {
    connect
} from 'react-redux';
import userActionCreator from '../../../store/actionCreators/user';
import eventActionCreator from '../../../store/actionCreators/event';

class DetailPage extends React.Component {
  handleGoToEvent = () => {
    const event = this.props.navigation.state.params;
    event.peopleGoing = [...event.peopleGoing, this.props.userStore.user];
    this.setState({});
    this.props.eventActions.goTo(event.id);
  };

  render() {
    const event = this.props.navigation.state.params;
    // const fromDate = moment(event.from).format('DD-MM-YYYY');
    // const tillDate = moment(event.till).format('DD-MM-YYYY');
    return (
      <Container>
        <Content>
          <Image source={{uri: event.image}} style={{ height: 200, width: '100%' }} />
          <Text style={{ textAlign: 'center', fontSize: 28, marginTop: 20 }}>
            {event.name}
          </Text>
          <View style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5
          }}>
            {event.username ?
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 14, marginRight: 5 }}>
              Een {event.private === 1 ? 'prive' : 'publiek'} evenement van {event.username}
            </Text>
            <Image 
              source={{uri: event.avatar}}
              style={{ borderRadius: 17.5, height: 35, width: 35 }}
            />
            </View>
            :
            <Text style={{ fontSize: 14, marginRight: 5 }}>
              Dit evenement is automatisch toegevoegd
            </Text>
            }
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10
          }}>
            <Text style={{marginRight: 10}}>Van: {event.fromDate}</Text>
            <Text>Tot: {event.till}</Text>
          </View>
          <Text style={{
            textAlign: 'center',
            padding: 20
          }}>
            {event.description}
          </Text>
          {event.username !== this.props.userStore.user.username &&
           !event.peopleGoing.find(person => person.username === this.props.userStore.user.username) ?
          <Button block style={{ marginHorizontal: 20 }} onPressOut={this.handleGoToEvent}>
            <Text>Count me in!</Text>
          </Button>
          :
          <Button block style={{ marginHorizontal: 20 }} disabled>
            <Text>Je gaat! Awesome!</Text>
          </Button>
          }
          {event.peopleGoing && event.peopleGoing.length > 0 ?
          <Text style={{textAlign: 'center', width: '100%', marginTop: 10}}>
            Deze mensen gaan hier naartoe!
          </Text>
          :
          <Text style={{textAlign: 'center', width: '100%', marginTop: 10}}>
            Er gaat verder nog niemand naar dit evenement.
          </Text>
          }
          {event.peopleGoing && event.peopleGoing.length > 0 &&
          <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
          }}>
              {event.peopleGoing.map((person, i) => 
              <Image 
                  key={i}
                  source={{uri: person.avatar}}
                  style={{ borderRadius: 17.5, height: 35, width: 35, marginTop: 10, marginHorizontal: 5 }}
              />
              )}
          </View>
          }
        </Content>
      </Container>
    );
  }
}
export default connect(
    state => ({
        userStore: state.user,
        eventStore: state.event,
    }),
    dispatch => ({
        userActions: userActionCreator(dispatch),
        eventActions: eventActionCreator(dispatch),
    })
)(DetailPage);

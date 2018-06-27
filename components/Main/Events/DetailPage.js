import React from 'react';
import { Container, Content, Text, View } from 'native-base';
import { Image } from 'react-native';
import moment from 'moment';

class DetailPage extends React.Component {
  render() {
    const event = this.props.navigation.state.params;
    const fromDate = moment(event.from).format('DD-MM-YYYY');
    const tillDate = moment(event.till).format('DD-MM-YYYY');
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
            {event.user ?
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 14, marginRight: 5 }}>
              Door {event.username}
            </Text>
            <Image 
              source={{uri: event.user.avatar}}
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
            <Text style={{marginRight: 10}}>Van: {fromDate}</Text>
            <Text>Tot: {tillDate}</Text>
          </View>
          <Text style={{
            textAlign: 'center',
            padding: 20
          }}>
            {event.description}
          </Text>
        </Content>
      </Container>
    );
  }
}

export default DetailPage;

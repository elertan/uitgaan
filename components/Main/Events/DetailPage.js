import React from 'react';
import { Container, Content, Text, View, Button } from 'native-base';
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
          <Button block style={{ marginHorizontal: 20 }}>
            <Text>Ik ga hier heen</Text>
          </Button>
          {/* https://cdn.discordapp.com/avatars/125158974730272768/a9f7078062eede74e4b535f98bc8c81f.png?size=256 */}
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {event.name === 'Dennis is een lul' &&
            <Image 
              source={{uri: 'https://cdn.discordapp.com/avatars/125158974730272768/a9f7078062eede74e4b535f98bc8c81f.png?size=256'}}
              style={{ borderRadius: 17.5, height: 35, width: 35, marginTop: 10 }}
            />
            }
          </View>
        </Content>
      </Container>
    );
  }
}

export default DetailPage;

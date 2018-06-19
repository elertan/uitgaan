import React from 'react';
import { Container, Content, Text, View } from 'native-base';
import { Image } from 'react-native';

class DetailPage extends React.Component {
  render() {
    const event = this.props.navigation.state.params;
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
            <View>
            <Text style={{ fontSize: 14, marginRight: 5 }}>
              Door USERNAME 
            </Text>
            <Image 
              source={{uri: 'https://cdn.inquisitr.com/wp-content/uploads/2013/06/Big-yellow-duck-being-banned-in-China-over-Tienenman-Square-issue.jpg'}}
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
            <Text style={{marginRight: 10}}>Van: DATUM</Text>
            <Text>Tot: DATUM</Text>
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

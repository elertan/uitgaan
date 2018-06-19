import React from 'react';
import { Container, Content, Text } from 'native-base';

class DetailPage extends React.Component {
  render() {
    console.log(this.props.navigation.state.params);
    const event = this.props.navigation.state.params;
    return (
      <Container>
        <Content>
          <Text style={{ textAlign: 'center', fontSize: 26 }}>
            {event.name}
          </Text>
        </Content>
      </Container>
    );
  }
}

export default DetailPage;

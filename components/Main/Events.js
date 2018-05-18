import React from 'react';
import {
    Container,
    View,
    Text,
} from 'native-base';

class Events extends React.Component {
    render() {
        return (
            <Container>
                <View style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                 }}>
                    <Text>Evenementen</Text>
                </View>
            </Container>
        );
    }
}

export default Events;
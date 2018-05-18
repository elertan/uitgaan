import React from 'react';
import {
    Container,
    View,
    Text,
} from 'native-base';

class Friends extends React.Component {
    render() {
        return (
            <Container>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>Vrienden</Text>
                </View>
            </Container>
        );
    }
}

export default Friends;
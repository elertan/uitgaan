import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';

const friends = [
    { name: 'Gavin den Hollander' },
    { name: 'Dennis Kievits' },
    { name: 'Bart Simons' },
    { name: 'Kelvin' },
    { name: 'Jurian Vink' },
    { name: 'Rechterhand' },
    { name: 'Google' },
];

export default class VriendenPage extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    {friends.map((friend, i) => {
                        return (
                            <Card key={i}>
                                <CardItem>
                                <Left>
                                    <View style={{
                                        height: 35,
                                        width: 35,
                                        backgroundColor: '#121212',
                                        borderRadius: 50,
                                        marginRight: 10
                                    }} />
                                    {/* <Image source={} /> */}
                                    <Left>
                                    <Text>{friend.name}</Text>
                                    </Left>
                                </Left>
                                </CardItem>
                                {/* <CardItem cardBody>
                                <Image source={{uri: locatie.imageUrl }} style={{height: 200, width: null, flex: 1}}/>
                                </CardItem> */}
                            </Card>
                        );
                    })}
                </Content>
            </Container>
        );
    }
}
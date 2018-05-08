import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class LocatiePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locaties: [
                {
                    naam: 'Beurs',
                    plaats: 'Rotterdam',
                    imageUrl: 'https://sfeerhoreca.smugmug.com/CafedeBeurs/Zaterdag-10-mei-2014-Cafe/i-KTBNS3P/0/f4a4e608/M/20140510_Sila_Beurs-14-M.jpg'
                },
                {
                    naam: 'Annabel ;)',
                    plaats: 'Rotterdam',
                    imageUrl: 'http://www.spottedbylocals.com/rotterdam/files/annabel-rotterdam-by-poppodium-annabel.jpg'
                },
                {
                    naam: 'Thalia',
                    plaats: 'Rotterdam'
                },
                {
                    naam: 'Dordrecht',
                    plaats: 'Mertz'
                },
            ]
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.locaties.map((locatie, i) => {
                        return (
                            <Card key={i}>
                                <CardItem>
                                <Left>
                                    <Body>
                                    <Text>{locatie.naam}</Text>
                                    <Text note>{locatie.plaats}</Text>
                                    </Body>
                                </Left>
                                </CardItem>
                                <CardItem cardBody>
                                <Image source={{uri: locatie.imageUrl }} style={{height: 200, width: null, flex: 1}}/>
                                </CardItem>
                                <CardItem>
                                <Left>
                                    <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>4 Comments</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                                </CardItem>
                            </Card>
                        );
                    })}
                </Content>
            </Container>
        );
    }
}
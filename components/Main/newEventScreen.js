import React from 'react';
import {
    StyleSheet, Image,
} from 'react-native';
import {
    Container,
    View,
    Form,
    Item,
    Input,
    Button,
    Content,
    Text,
    Card,
    Badge,
    ListItem,
    Left,
    Right,
    Body,
    Icon,
} from 'native-base';

import ImagePicker from 'react-native-image-crop-picker';


const styles = StyleSheet.create({
    formItemFirst: {
        marginVertical: 15
    },
    formItem: {
        marginVertical: 15,
        marginTop: -5,
    },
    loginButton: {
        marginTop: 25
    }
});

export default class newEventScreen extends React.Component {
    state = {
        name: '',
        price: '',
        discription: '',
        displayPreview: '',
        avatar: '',
    };
    handleSelectProfileIcon = async () => {
        try {
            const image = await ImagePicker.openPicker({
                cropping: true,
                cropperCircleOverlay: true,
                cropperCancelText: 'Annuleer',
                cropperChooseText: 'Dit wordt em!',
                cropperToolbarTitle: 'Pak nog ff het mooiste stukje',
                width: 250,
                height: 250,
                writeTempFile: false,
                includeBase64: true
            });
            this.setState({ avatar: 'data:' + image.mime + ';base64,' + image.data });
        } catch (error) {
            console.log(error);
        }

    }

    renderImage(){
        if(this.state.avatar){
            return (<Image style={{ width: '100%', height: 200 }} source={{ uri: this.state.avatar }} />);
        }
        return (<Image style={{ width: '100%', height: 200 }} source={require('../../assets/images/newEventImageHolder.jpg')} />);
    }

    renderDisplayPreview() {

        console.log();
        return (<Card>
            {this.renderImage()}
            <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.name}</Text>
                <Text note>{this.state.discription}</Text>
            </View>
            <Badge info style={{ position: 'absolute', right: 0, margin: 4 }}>
                <Text>€ {this.state.price}</Text>
            </Badge>
        </Card>);

    }
    render() {

        return (<Content>
            <Form>
                <Item style={styles.formItemFirst}>
                    <Input
                        placeholder="Event Naam"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                </Item>
                <Item style={styles.formItem}>
                    <Input
                        placeholder="Prijs"
                        value={this.state.price}
                        onChangeText={text => this.setState({ price: text })}
                    />
                </Item>
                <Item style={styles.formItem}>
                    <Input
                        placeholder="Event Beschrijving"
                        value={this.state.discription}
                        onChangeText={text => this.setState({ discription: text })}
                    />
                </Item>
                <ListItem onPress={this.handleSelectProfileIcon} style={styles.formItem}>
                    <Body>
                        <Text>Kies een plaatje</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            </Form>
            <Button block danger style={{ marginHorizontal: 10, marginBottom: 10, backgroundColor:'#F44336'}}>
                <Text>Plaats evenement</Text>
            </Button>
            {this.renderDisplayPreview()}
        </Content>);
    }

}
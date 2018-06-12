import React from 'react';
import {
    StyleSheet,
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
} from 'native-base';


const styles = StyleSheet.create({
    formItemFirst:{
        marginVertical: 15
    },
    formItem: {
        marginVertical: 15,
        marginTop:-5,
    },
    loginButton: {
        marginTop: 25
    }
});

export default class newEventScreen extends React.Component{
    state = {
        name: '',
        nameError: undefined,
        price: '',
        priceError: undefined,
        discription: '',
        discriptionError: undefined,
        displayPreview:'',
    };

    renderDisplayPreview(){
        if(!this.state.name && !this.state.price && !this.state.discription){
            //return()
        }
    }
    render(){

        return(<Content>
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
            </Form>

        </Content>);
    }

}
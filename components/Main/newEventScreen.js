import React from 'react';
import {
    StyleSheet, Image,Alert
} from 'react-native';
import { connect } from 'react-redux';
import eventsActions from '../../store/actionCreators/event';
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
    Switch,
} from 'native-base';
import DatePicker from 'react-native-datepicker'
import { ImagePicker, Permissions} from 'expo';
//import ImagePicker from 'react-native-image-crop-picker';


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
    },
    datepicker: {
        borderTopWidth: 0, 
        borderRightWidth: 0, 
        borderBottomWidth: 1, 
        borderLeftWidth: 0, 
        flex:1, 
        marginBottom: 10, 
        borderColor: '#d6d7da',
        marginHorizontal: 15
    }
});

class newEventScreen extends React.Component {
    state = {
        name: '',
        price: '',
        discription: '',
        displayPreview: '',
        avatar: '',
        till: '',
        privateEvent: true, 
        from:'',
    };

    _pickImage = async () => {
        Permissions.askAsync(Permissions.CAMERA_ROLL);
        Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 2],
        });


        if (!result.cancelled) {
            var ImageLinkSplitOnDot = result.uri.split(".");
            this.setState({ avatar: "data:image/" + ImageLinkSplitOnDot[ImageLinkSplitOnDot.length - 1] + ";base64," + result.base64});
        }
    };


 

    async postEvent(){
        const d = this.state;
        await this.props.eventActions.newEvent(
            d.name,
            d.discription,
            d.till,
            d.from,
            d.price,
            d.image,
            d.privateEvent
        );
        Alert.alert('Posted');
    }
    renderImage(){
        if(this.state.avatar){
            return (<Image style={{ width: '100%', height: 200 }} source={{ uri: this.state.avatar }} />);
        }
        return (<Image style={{ width: '100%', height: 200 }} source={require('../../assets/images/newEventImageHolder.jpg')} />);
    }

    renderDisplayPreview() {
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

    getCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '-' + dd + '-' + yyyy;
        return (today);
    }

    privateEventSwitch(){
        if (this.state.privateEvent){
            this.setState({ privateEvent: false })
        }else{
            this.setState({ privateEvent: true })
        }
    }

    render() {

        return (<Content>
            <Form>
                <ListItem style={styles.formItemFirst}>
                    <Body>
                        <Text>Alleen voor volgers?</Text>
                    </Body>
                    <Right>
                        <Switch value={this.state.privateEvent} onValueChange={() => this.privateEventSwitch()}/>
                    </Right>
                </ListItem>

                <Item style={styles.formItem}>
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
                <ListItem onPress={this._pickImage} style={styles.formItem}>
                    <Body>
                        <Text>Kies een plaatje</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row'}}>
                <DatePicker
                    style={styles.datepicker}
                date={this.state.till}
                mode="date"
                placeholder="begin datum"
                format="DD-MM-YYYY"
                    minDate={this.getCurrentDate()}
                maxDate="12-12-2200"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
        customStyles={{
                    dateIcon: {
                        display:'none',
                        right: 20,
                        top: 4,
                        marginRight: 0
                    },
                    dateInput: {
                        marginLeft: 0,
                        width:'100%',
                        textAlign: 'left'
                    },
            dateInput:{
                borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0,
                

            }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ from: date }) }}
      />
                <DatePicker
                    style={styles.datepicker}
                    date={this.state.till}
                    mode="date"
                    placeholder="eind datum"
                    format="DD-MM-YYYY"
                    minDate={this.getCurrentDate()}
                    maxDate="12-12-2200"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            display: 'none',
                            position: 'absolute',
                            right: 20,
                            top: 4,
                            marginRight: 0
                        },
                        dateInput: {
                            marginLeft: 0,
                            width: '100%',
                            textAlign: 'left'
                        },
                        dateInput: {
                            borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0,


                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { this.setState({ from: date }) }}
                />
                </View>
            </Form>
            <Button block danger style={{ marginHorizontal: 10, marginBottom: 10, backgroundColor: '#F44336' }} onPress={() => this.postEvent()}>
                <Text>Plaats evenement</Text>
            </Button>
            {this.renderDisplayPreview()}
        </Content>);
    }

    

}

export default connect(state => ({
    eventStore: state.event
}), dispatch => ({
    eventActions: eventsActions(dispatch)
    }))(newEventScreen);
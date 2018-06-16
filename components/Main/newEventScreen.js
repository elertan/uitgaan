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
} from 'native-base';
import DatePicker from 'react-native-datepicker'
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
    },
    datepicker: {
        borderTopWidth: 0, 
        borderRightWidth: 0, 
        borderBottomWidth: 1, 
        borderLeftWidth: 0, 
        width: "100%", 
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
        from:'',
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
            Alert.alert("Helaas is deze optie niet mogelijk in combinatie met expo");
        }

    }

    async postEvent(){
        const d = this.state;
        console.log(await this.props.eventActions.newEvent(
            d.name,
            d.discription,
            d.till,
            d.from,
            d.price,
            d.image
        ));
        Alert.alert('Posted');
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
                        position: 'absolute',
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
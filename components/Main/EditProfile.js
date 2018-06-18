import React from 'react';
import {
    connect
} from 'react-redux';
import userActionCreator from '../../store/actionCreators/user';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Content, Form, Input, Item, Button} from 'native-base';
import {
    Icon,
    Avatar,
} from 'react-native-elements';
import SettingsList from 'react-native-settings-list';
import { ImagePicker, Permissions } from 'expo';
import { TextField } from 'react-native-material-textfield';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    userImage: {
        borderRadius: 55,
        height: 110,
        marginBottom: 10,
        width: 110,
        position: 'absolute',
        paddingTop:40,
        top:20,
    },
    Shadow:{
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 5,
        paddingTop: 55, color: 'rgba(200,200,200,0.8)', fontSize: 25, fontWeight: 'bold'
    }, marginAlignHorizontal: {
        marginHorizontal: 10,
    }
 
});

class EditeProfile extends React.Component {
    state = {
        avatar: this.props.userStore.user.avatar,
        firstname: this.props.userStore.user.firstname,
        lastname: this.props.userStore.user.lastname,
        bio: this.props.userStore.user.bio,
        isLoading: false,
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.userStore.updateProfileSuccess !== nextProps.userStore.updateProfileSuccess) {
            this.setState({isLoading: false});
            this.props.navigation.pop();
        }
    }

    _pickImage = async () => {
        Permissions.askAsync(Permissions.CAMERA_ROLL);
        Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 2],
        });

        //console.log(result);

        if (!result.cancelled) {
            var ImageLinkSplitOnDot = result.uri.split(".");
            this.setState({ avatar: "data:image/" + ImageLinkSplitOnDot[ImageLinkSplitOnDot.length - 1] + ";base64," + result.base64 });
            //console.log(this.state.avatar);
        }
    };

    handleUpdateProfile = () => {
        this.setState({isLoading: true});
        this.props.userActions.updateProfile({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            bio: this.state.bio,
            avatar: this.state.avatar
        });
    }

    renderHeader = () => {
        return (
            <Content>
                <View style={{alignItems:'center'}}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: this.state.avatar }}>
                    </Image>
                    <Text style={styles.Shadow} onPress={this._pickImage}>EDIT</Text>
                   </View>
                <View style={{ marginTop:120,}}>
                <Form>
                    <Item style={styles.marginAlignHorizontal}>
                        <Input
                            value={this.state.firstname}
                            onChangeText={text => this.setState({ firstname: text })}
                        />
                        <Input
                            value={this.state.lastname}
                            onChangeText={text => this.setState({ lastname: text })}
                        />
                    </Item>
                        <Item style={styles.marginAlignHorizontal}>
                            <TextField
                                multiline
                                label="Bio"
                                value={this.state.bio}
                                title="Vertel wat over jezelf"
                                characterRestriction={200}
                                inputContainerStyle={{ height: 150 ,width:'100%'}}
                                containerStyle={{width:'100%'}}
                                onChangeText={text => {
                                    if (text.length > 200) return;
                                    this.setState({ bio: text});
                                }}
                            />
                        </Item>
                        <Button
                            block
                            style={styles.marginAlignHorizontal}
                            onPress={this.handleUpdateProfile}
                            disabled={this.state.isLoading}
                        >
                            <Text style={{color:'#fff'}}>Bewerk Profiel</Text>
                        </Button>
                </Form>
                        </View>
            </Content>
        );
    }

   

    render() {
        return (
            <View style={{ backgroundColor: '#f6f6f6', height: '100%' }}>
                {this.renderHeader()}
            </View>
        );
    }
}

export default connect(
    state => ({
        userStore: state.user
    }),
    dispatch => ({
        userActions: userActionCreator(dispatch)
    })
)(EditeProfile);
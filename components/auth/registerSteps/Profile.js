import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    Button,
    Text
} from 'native-base';
import {
    Icon,
} from 'react-native-elements';
//import ImagePicker from 'react-native-image-crop-picker';
import { ImagePicker, Permissions } from 'expo';
import {
    firstname as validateFirstname,
    lastname as validateLastname
} from '../../../input-validation/common';
import ValidationManager from '../../../input-validation/ValidationManager';
import { TextField } from 'react-native-material-textfield';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    motivationalText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        color: '#555',
        marginVertical: 15,
        fontSize: 13
    },
    progressStepperContainer: {
        marginTop: 20, 
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between',
    },
    profileIconContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    profileIcon: {
        backgroundColor: '#444',
        width: 125,
        height: 125,
        borderRadius: 65,
    },
    profileIconTouchableOpacity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default class Profile extends React.Component {
    static propTypes = {
        onNext: PropTypes.func.isRequired
    };

    state = {
        avatar: null,
        bio: '',
        validationManager: new ValidationManager()
    };

    componentDidMount() {
        if (this.props.data) {
            this.setState(this.props.data);
        }
    }

    // handleSelectProfileIcon = async () => {
    //     const image = await ImagePicker.openPicker({
    //         cropping: true,
    //         cropperCircleOverlay: true,
    //         cropperCancelText: 'Annuleer',
    //         cropperChooseText: 'Dit wordt em!',
    //         cropperToolbarTitle: 'Pak nog ff het mooiste stukje',
    //         width: 250,
    //         height: 250,
    //         writeTempFile: false,
    //         includeBase64: true
    //     });
    //     this.setState({ avatar: 'data:' + image.mime + ';base64,' + image.data });
    // }

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
    mayProceed = () => {
        return this.state.avatar;
    }

    handleProceed = () => {
        const data = {
            avatar: this.state.avatar,
            bio: this.state.bio
        };
        this.props.onNext(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileIconContainer}>
                    <View style={styles.profileIcon}>
                        <TouchableOpacity 
                            onPress={this._pickImage}
                            style={styles.profileIconTouchableOpacity}
                        >
                            {this.state.avatar ?
                            <Image
                                source={{ uri: this.state.avatar }}
                                style={{width: 125, height: 125, resizeMode: 'stretch', borderRadius: 60}}
                            />
                            :    
                            <Icon 
                                name="add-a-photo"
                                color="#EEE"
                                size={40}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.motivationalText}>
                {this.state.avatar ?
                'Top! Ziet er goed uit.'
                :
                'Je kunt hierboven een afbeelding kiezen om op je profiel te tonen, zodat anderen direct zien dat jij het bent!'}
                </Text>
                <TextField 
                    multiline
                    label="Bio"
                    title="Vertel wat over jezelf"
                    characterRestriction={200}
                    inputContainerStyle={{ height: 150 }}
                    onBlur={() => this.setState({ validationManager: this.state.validationManager.enableFeedback('bio') })}
                    error={this.state.validationManager.getError('bio')}
                    onChangeText={bio => {
                        if (bio.length > 200) return;
                        this.setState({ bio, validationManager: this.state.validationManager.setError('bio', () => undefined) });
                    }}
                />
                <View style={styles.progressStepperContainer}>
                    <Button
                        onPress={this.props.onBack}
                        danger
                    >
                        <Text>Vorige</Text>
                    </Button>
                    <Button
                        disabled={!this.mayProceed()}
                        onPress={this.handleProceed}
                    >
                        <Text>Volgende</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
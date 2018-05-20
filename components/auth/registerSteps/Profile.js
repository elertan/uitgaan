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
import ImagePicker from 'react-native-image-crop-picker';
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
        width: 100,
        height: 100,
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
        validationManager: new ValidationManager(['firstname', 'lastname'])
    };

    handleSelectProfileIcon = async () => {
        const image = await ImagePicker.openPicker({
            cropping: true,
            cropperCircleOverlay: true,
            cropperCancelText: 'Annuleer',
            cropperChooseText: 'Dit wordt em!',
            width: 300,
            height: 300,
        });
        this.setState({ avatar: image });
    }

    mayProceed = () => {
        return this.state.validationManager.isValidSubset(['firstname', 'lastname']);
    }

    handleProceed = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        };
        this.props.onNext(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileIconContainer}>
                    <View style={styles.profileIcon}>
                        <TouchableOpacity 
                            onPress={this.handleSelectProfileIcon}
                            style={styles.profileIconTouchableOpacity}
                        >
                            {this.state.avatar ?
                            <Image
                                source={this.state.avatar}
                            />
                            :    
                            <Icon 
                                name="add-a-photo"
                                color="#EEE"
                                size={35}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.motivationalText}>Je kunt hierboven een afbeelding kiezen om op je profiel te tonen, zodat anderen direct zien dat jij het bent!</Text>
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
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
} from 'native-base';
import {
    Video,
} from 'expo';
import DismissKeyboardHOC from '../hocs/DismissKeyboardHOC';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    mainContainer: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        color: '#FFF',
        fontSize: 60,
        fontFamily: 'Logo',
        marginTop: 80,
        textAlign: 'center',
    },
    promotionalTextContainer: {
    },
    promotionalText: {
        color: '#DDD',
        fontFamily: 'Roboto',
        fontSize: 16,
        marginHorizontal: 20,
    },
    loginText: {
        color: '#FFF',
        fontSize: 18
    },
    signUpText: {
        color: '#FFF',
        fontSize: 18
    }
});

class Login extends React.Component {
    state = {
        loading: true
    };

    _handleVideoRef = async component => {
        const playbackObject = component;
        await playbackObject.loadAsync(require('../assets/videos/background.mp4'));
        await playbackObject.setVolumeAsync(0);
        await playbackObject.setIsLoopingAsync(true);
        await playbackObject.playAsync();
        this.setState({loading: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <Video
                    isLooping
                    resizeMode="cover"
                    ref={this._handleVideoRef}
                    style={StyleSheet.absoluteFill}
                />
                {/* Dit geeft een doorzichtige laag over de app */}
                <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
                {this.state.loading ?
                <View styles={styles.mainContainer}><Text style={{fontSize: 26}}>Laden...</Text></View>
                :
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View styles={styles.mainContainer}>
                        <Text style={styles.header}>Uitgaan</Text>
                        <View style={styles.promotionalTextContainer}>
                            <Text style={styles.promotionalText}>Jouw Nachtleven</Text>
                            <Text style={styles.promotionalText}>Verbind met je vrienden, maak nieuwe events aan of bezoek events die je vrienden geven!</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Button
                            style={{flex: 1, height: 75, backgroundColor: '#2e2e2e'}}
                            full
                            onPress={() => alert('test')}
                        >
                            <Text style={styles.loginText}>LOG IN</Text>
                        </Button>
                        <Button 
                            style={{flex: 1, height: 75}}
                            full
                            onPress={() => alert('test')}
                        >
                            <Text style={styles.signUpText}>SIGN UP</Text>
                        </Button>
                    </View>
                </View>
                }
            </View>
        );
    }
}

Login.propTypes = {

};

export default DismissKeyboardHOC(Login);
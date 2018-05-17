import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
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
import Swiper from 'react-native-swiper';
import Slider from './reusable/Slider';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    mainContainer: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        color: '#FFF',
        fontSize: 60,
        fontFamily: 'Logo',
        marginTop: 80,
        textAlign: 'center',
    },
    promotionalTextContainer: {
        // position: 'relative',
        // bottom: 100
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
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    slideHeaderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    slideText: {
        marginTop: 10,
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    }
});

const promotionalContent = [
    {
        header: 'Hallo',
        text: 'Registreer om te verbinden met je vrienden, evenementen te bekijken of zelf evenementen te organiseren.',
    },
    {
        header: 'Gezellig',
        text: 'Nooit meer een feestje missen',
    },
    {
        header: 'Iets',
        text: 'Nog wat',
    },
];

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
                    </View>
                    {/* <View style={styles.promotionalTextContainer}>
                        <Slider items={promotionalContent} />
                    </View> */}
                    <View style={{flexDirection: 'row', marginTop: 325}}>
                        <Swiper style={styles.wrapper} height={200} horizontal={true} autoplay autoplayTimeout={5}>
                        {promotionalContent.map((item, index) => 
                            <View style={styles.slide} key={index}>
                                <Text style={styles.slideHeaderText}>{item.header}</Text>
                                <Text style={styles.slideText}>{item.text}</Text>
                            </View>
                        )}
                        </Swiper>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Button
                            style={{flex: 1, height: 75, backgroundColor: 'rgba(46, 46, 46, 0.95)'}}
                            full
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text style={styles.loginText}>LOG IN</Text>
                        </Button>
                        <Button 
                            style={{flex: 1, height: 75, backgroundColor: 'rgba(8, 96, 255, 0.95)'}}
                            full
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                            <Text style={styles.signUpText}>REGISTREER</Text>
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

export default Login;

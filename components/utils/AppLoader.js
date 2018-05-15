import React from 'react';
import {
    Platform,
} from 'react-native';
import {
    AppLoading,
    Font,
} from 'expo';

export default class AppLoader extends React.Component {
    state = {
        loaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Logo: require("../../assets/fonts/grobold.ttf"),
            // ProductSans: require('../../assets/fonts/productsans.tff'),
            // 'product-sans-bold': require('../../assets/fonts/productsansbold.tff'),
            // 'product-sans-italic': require('../../assets/fonts/productsansitalic.tff'),
            // 'product-sans-bold-italic': require('../../assets/fonts/productsansbolditalic.tff'),
        });

        if (Platform.OS === 'android') {
            StatusBar.setHidden(true);
        }
        this.setState({loaded: true});
    }

    render() {
        if (!this.state.loaded) {
            return (
                <AppLoading />
            );
        }

        return this.props.children;
    }
}
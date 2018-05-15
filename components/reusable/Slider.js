import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-carousel-control';

const styles = StyleSheet.create({
    text: {
        color: '#EEE',
        fontSize: 16,
    },
    headerText: {
        fontSize: 21,
        fontWeight: '700',
    }
});

export default class Slider extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({ 
            header: PropTypes.string.isRequired, 
            text: PropTypes.string.isRequired 
        })).isRequired
    };
    state = {
        index: 0
    };

    render() {
        return (
            <View>
                <Carousel>
                {this.props.items.map((item, i) => {
                    return (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} key={i}>
                            <Text style={[styles.text, styles.headerText]}>{item.header}</Text>
                            <View>
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        </View>
                    );
                })}
                </Carousel>
            </View>
        );
    }
}
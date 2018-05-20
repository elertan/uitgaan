import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class IndexViewRenderer extends React.Component {
    static propTypes = {
        ...View.propTypes,
        index: PropTypes.number.isRequired
    };

    render() {
        const { index } = this.props;
        const children = this.props.children.length || 1;
        if (index + 1 > children || index < 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>IndexViewRenderer out of bounds</Text>
                </View>
            );
        }
        const element = this.props.children[index];

        return (
            <View
                {...this.props}
            >
                {React.Children.map(this.props.children, (child, i) => {
                    if (index === i) return child;
                })}
            </View>
        );
    }
}
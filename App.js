import React from 'react';
import Root from './components/Root';
import DrawerContent from './components/DrawerContent';
import { 
    Drawer,
    Text
} from 'native-base';
import Expo from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    closeDrawer = () => {
        this.drawer._root.close();
    }

    openDrawer = () => {
        this.drawer._root.open();
    }

    render() {
        if (this.state.loading) {
            return (
                <Text>Laden...</Text>
            );
        }

        return (
            <Drawer 
                ref={(ref) => { this.drawer = ref; }}
                content={<DrawerContent />}
                onClose={this.closerDrawer}
            >
                <Root requestOpenDrawer={this.openDrawer} />
            </Drawer>
        );
    }
}
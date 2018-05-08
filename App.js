import React from 'react';
import Root from './components/Root';
import DrawerContent from './components/DrawerContent';
import { Drawer } from 'native-base';
import Expo from 'expo';

export default class App extends React.Component {
    async componentDidMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
    }

    closeDrawer = () => {
        this.drawer._root.close();
    }

    openDrawer = () => {
        this.drawer._root.open();
    }

    render() {
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
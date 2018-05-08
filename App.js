import React from 'react';
import Root from './components/Root';
import DrawerContent from './components/DrawerContent';
import { Drawer } from 'native-base';

export default class App extends React.Component {
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
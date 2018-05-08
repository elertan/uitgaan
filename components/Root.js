import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs } from 'native-base';
import SettingsPage from './Tabs/SettingsPage';
import VriendenPage from './Tabs/VriendenPage';
import LocatiePage from './Tabs/LocatiePage';

export default class Root extends React.Component {

    render() {
        return (
            <Container>
                <Header hasTabs>
                <Left>
                    <Button transparent onPress={this.props.requestOpenDrawer}>
                    <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>UitGAAN!</Title>
                </Body>
                <Right />
                </Header>
                <Tabs initialPage={0}>
                    <Tab heading="Settings">
                        <SettingsPage />
                    </Tab>
                    <Tab heading="Vrienden">
                        <VriendenPage />
                    </Tab>
                    <Tab heading="Locatie">
                        <LocatiePage />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

export default class DrawerContent extends React.Component {
    render() {
        return (
            <Container>
                <Header />
                <Content style={styles.content}>
                {/* <List>
                    <ListItem>
                    <Text>Simon Mignolet</Text>
                    </ListItem>
                    <ListItem>
                    <Text>Nathaniel Clyne</Text>
                    </ListItem>
                    <ListItem>
                    <Text>Dejan Lovren</Text>
                    </ListItem>
                </List> */}
                    <Text>Dit is de drawer</Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFF'
    }
});
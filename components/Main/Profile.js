import React from 'react';
import {
    connect
} from 'react-redux';
import userActionCreator from '../../store/actionCreators/user';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { 
    Icon,
    Avatar,
} from 'react-native-elements';
import SettingsList from 'react-native-settings-list';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 45,
    },
    socialIcon: {
      marginLeft: 14,
      marginRight: 14,
    },
    socialRow: {
      flexDirection: 'row',
    },
    userBioRow: {
      marginLeft: 40,
      marginRight: 40,
    },
    userBioText: {
      color: 'gray',
      fontSize: 13.5,
      textAlign: 'center',
    },
    userImage: {
      borderRadius: 55,
      height: 110,
      marginBottom: 10,
      width: 110,
    },
    userNameRow: {
      marginBottom: 10,
    },
    userNameText: {
      color: '#5B5A5A',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 12,
      marginTop: 20
    },
    listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 0,
    },
    listItemContainer: {
        borderBottomColor: '#ECECEC',
    },
    infoText: {
        fontSize: 14,
        color: '#777',
        fontWeight: '600',
        marginLeft: 15,
        marginBottom: -15
    }
});

class Profile extends React.Component {
    renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.userRow}>
                <Image
                    style={styles.userImage}
                    source={{
                        uri: this.props.userStore.user.avatar,
                    }}
                />
                <View style={styles.userNameRow}>
                    <Text style={styles.userNameText}>{this.props.userStore.user.firstname} {this.props.userStore.user.lastname}</Text>
                </View>
                <View style={styles.userBioRow}>
                    <Text style={styles.userBioText}>{this.props.userStore.user.bio}</Text>
                </View>
                </View>
                <View style={styles.socialRow}>
                <View>
                    <Icon
                    size={30}
                    type="entypo"
                    color="#3B5A98"
                    name="facebook-with-circle"
                    onPress={() => console.log('facebook')}
                    />
                </View>
                <View style={styles.socialIcon}>
                    <Icon
                    size={30}
                    type="entypo"
                    color="#56ACEE"
                    name="twitter-with-circle"
                    onPress={() => console.log('twitter')}
                    />
                </View>
                <View>
                    <Icon
                    size={30}
                    type="entypo"
                    color="#DD4C39"
                    name="google--with-circle"
                    onPress={() => console.log('google')}
                    />
                </View>
                </View>
            </View>
        );
    }

    renderSettings = () => {
        return (
            <View>
                <SettingsList borderColor="#AAA">
                    <SettingsList.Header 
                        headerText="Account"
                        headerStyle={{ marginLeft: 15, color: '#333' }}
                    />
                    <SettingsList.Item 
                        title="Wijzig"
                        icon={
                            <Icon 
                                type="material-community"
                                name="account-edit"
                                color="#333"
                                size={28}
                                containerStyle={{ marginLeft: 15 }}
                            />
                        }
                    />
                    <SettingsList.Header headerStyle={{ marginTop: 25 }} />
                    <SettingsList.Item 
                        title="Log uit"
                        onPress={this.props.userActions.logout}
                        icon={
                            <Icon 
                                type="feather"
                                name="log-out"
                                color="#DD4C39"
                                containerStyle={{ marginLeft: 15 }}
                            />
                        }
                    />
                </SettingsList>
            </View>
        );
    }

    render() {
        return (
            <View>
                {this.renderHeader()}
                {this.renderSettings()}
            </View>
        );
    }
}

export default connect(
    state => ({
        userStore: state.user
    }),
    dispatch => ({
        userActions: userActionCreator(dispatch)
    })
)(Profile);
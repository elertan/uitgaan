import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Icon } from 'react-native-elements';

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
});

class Profile extends React.Component {
    render() {
        const { avatar, name, bio } = { name: 'Dennis Kievits', bio: 'Software Engineer & CEO, loving React Native!', avatar: 'https://media.licdn.com/dms/image/C4D03AQEVCsFf79VT3Q/profile-displayphoto-shrink_200_200/0?e=1529888400&v=beta&t=xDHogTX88MLFM1Nzn24PYeg50IJ6n4Kj_s4xWTMdRBw' }
        return (
            <View style={styles.headerContainer}>
                <View style={styles.userRow}>
                <Image
                    style={styles.userImage}
                    source={{
                    uri: avatar,
                    }}
                />
                <View style={styles.userNameRow}>
                    <Text style={styles.userNameText}>{name}</Text>
                </View>
                <View style={styles.userBioRow}>
                    <Text style={styles.userBioText}>{bio}</Text>
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
}

export default Profile;
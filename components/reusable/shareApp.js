import {Share} from 'react-native';
export default function shareApp() {
    Share.share({
        message: 'Zie de beste plekken om vanavond uit te gaan!',
        url: 'https://dutchwebbuilding.nl/Uitgaan/', /// link aanpassen
        title: 'UitGaan!'
    }, {
            // Android only:
            dialogTitle: 'UitGaan!',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        });
}
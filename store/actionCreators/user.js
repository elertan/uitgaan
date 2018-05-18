import {
    CHECK_FOR_SAVED_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_REQUEST
} from '../actions/user';
import apiRequest from '../../apiRequest';
import { AsyncStorage } from 'react-native';

const creator = (dispatch) => ({
    checkForSavedUser: () => {
        return AsyncStorage.getItem('user').then(data => {
            dispatch({
                type: CHECK_FOR_SAVED_USER,
                user: JSON.parse(data)
            });
        }).catch(err => console.error(err));
    },
    login: (username, password) => {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        return apiRequest.post('/user', {
            username,
            password
        }).then(async res => {
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            dispatch({
                type: LOGIN_USER_SUCCESS,
                user: res.data
            });
        }).catch(err => dispatch({
            type: LOGIN_USER_ERROR,
        }));
    },
    logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch({
            type: LOGOUT_USER_REQUEST
        });
    }
});

export default creator;
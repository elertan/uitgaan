import {
    SET_USER,
    CHECK_FOR_SAVED_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    GET_ALL_SUCCESS,
    GET_ALL_ERROR,
    GET_ALL_FRIENDS_SUCCESS,
    FOLLOW_SUCCESS,
    FOLLOW_ERROR,
    UPDATE_PROFILE_SUCCESS
} from '../actions/user';
import ApiRequest from '../../apiRequest';
import { AsyncStorage } from 'react-native';

const initialState = {
    hasCheckedForSavedUser: false,
    user: undefined,
    isLoggingIn: false,
    loginError: undefined,
    isRegistering: false,
    registerError: undefined,
    registerUserResult: undefined,
    getAllUsers: undefined,
    getAllFriends: undefined,
    followSuccess: undefined,
    updateProfileSuccess: undefined,
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER: {
            return Object.assign({}, state, {
                user: action.user
            });
        }
        case CHECK_FOR_SAVED_USER: {
            return Object.assign({}, state, {
                hasCheckedForSavedUser: true,
                user: action.user
            });
        }
        case LOGIN_USER_REQUEST: {
            return Object.assign({}, state, {
                isLoggingIn: true,
            });
        }
        case LOGIN_USER_SUCCESS: {
            ApiRequest.getInstance().setAccessToken(action.user.accessToken);
            return Object.assign({}, state, {
                user: action.user,
                isLoggingIn: false,
            });
        }
        case LOGIN_USER_ERROR: {
            return Object.assign({}, state, {
                isLoggingIn: false,
                loginError: action.error
            });
        }
        case LOGOUT_USER_REQUEST: {
            return Object.assign({}, state, {
                user: undefined
            });
        }
        case REGISTER_USER_ERROR: {
            return Object.assign({}, state, {
                registerError: action.err,
                isRegistering: false
            });
        }
        case REGISTER_USER_REQUEST: {
            return Object.assign({}, state, {
                isRegistering: true
            });
        }
        case REGISTER_USER_SUCCESS: {
            return Object.assign({}, state, {
                isRegistering: false,
                registerUserResult: action.user
            });
        }
        case GET_ALL_SUCCESS: {
            return Object.assign({}, state, {
                getAllSuccess: action.users
            });
        }
        case GET_ALL_ERROR: {
            return Object.assign({}, state, {
                getAllError: action.err
            });
        }
        case GET_ALL_FRIENDS_SUCCESS: {
            return Object.assign({}, state, {
                getAllFriends: action.friends
            });
        }
        case FOLLOW_SUCCESS: {
            return Object.assign({}, state, {
                followSuccess: action.user,
            });
        }
        case FOLLOW_ERROR: {
            console.log(action.err);
        }
        case UPDATE_PROFILE_SUCCESS: {
            AsyncStorage.setItem('user', JSON.stringify(action.user));
            return Object.assign({}, state, {
                user: action.user,
                updateProfileSuccess: action.user
            });
        }
        default: {
            return state || initialState;
        }   
    }
}

export default reducer;
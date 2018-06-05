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
    GET_ALL,
    GET_ALL_SUCCESS,
    GET_ALL_ERROR
} from '../actions/user';

const initialState = {
    hasCheckedForSavedUser: false,
    user: undefined,
    isLoggingIn: false,
    loginError: undefined,
    isRegistering: false,
    registerError: undefined,
    registerUserResult: undefined,
    getAllUsers: undefined
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
        default: {
            return state || initialState;
        }   
    }
}

export default reducer;
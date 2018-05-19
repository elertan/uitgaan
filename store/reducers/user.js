import {
    CHECK_FOR_SAVED_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_REQUEST
} from '../actions/user';

const initialState = {
    hasCheckedForSavedUser: false,
    user: undefined,
    isLoggingIn: false,
    loginError: undefined,
};

const reducer = (state, action) => {
    switch (action.type) {
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
        default: {
            return state || initialState;
        }   
    }
}

export default reducer;
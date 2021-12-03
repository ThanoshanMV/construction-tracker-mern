import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  USER_LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

/**
 *  Creating initial state for authentication
 */
const initialState = {
  token: null,
  isAuthenticated: false,
  isAdmin: null,
  isUser: null,
  isRegistered: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //if registered successfully we put the token into the local storage.

    /**
     * Unnecessary parts are commented here
     */
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isUser: true,
        loading: false,
        user: payload,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: true,
        loading: false,
        user: payload,
      };
    //case REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isUser: true,
        loading: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isAdmin: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      //localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isAdmin: true,
        isRegistered: true,
        loading: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isAdmin: true,
        isRegistered: false,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        isUser: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}

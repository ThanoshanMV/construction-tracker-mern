import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load Member
export const load = () => async (dispatch) => {
  // Check localStorage for token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    /**
     * Sending multiple requests using axios
     * For Reference: https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
     */
    const requestToEmployeeRoute = axios.get('/api/employee/auth');
    const requestToAdminRoute = axios.get('/api/admin/auth');

    axios
      .all([requestToEmployeeRoute, requestToAdminRoute])
      .then(
        axios.spread((...responses) => {
          const responseToEmployeeRoute = responses[0];
          const responseToAdminRoute = responses[1];

          // use/access the results

          // responseToEmployeeRoute.data !== null, we'll dispatch employee details
          if (responseToEmployeeRoute.data) {
            console.log('Employee details has been loaded');
            dispatch({
              type: USER_LOADED,
              payload: responseToEmployeeRoute.data,
            });
          }
          if (responseToAdminRoute.data) {
            console.log('Admin details has been loaded');
            dispatch({
              type: USER_LOADED,
              payload: responseToAdminRoute.data,
            });
          }
        })
      )
      .catch((errors) => {
        // react on errors.
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Load User (Employee)
export const loadUser = () => async (dispatch) => {
  // Check localStorage for token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/employee/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Load User (Employee)
export const loadAdmin = () => async (dispatch) => {
  // Check localStorage for token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/admin/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User (Employee)
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Preparing data to be sent
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('api/employee/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      // res includes token too! (token that's created when registering employee)
      payload: res.data,
    });
    // we don't have to load employee details when admin registers..(loadUser())
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User (Employee)
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Preparing data to be sent
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/employee/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Login Admin
export const loginAdmin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Preparing data to be sent
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/admin/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout/ Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

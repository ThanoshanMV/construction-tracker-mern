import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PERSON_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load Person
export const loadPerson = () => async (dispatch) => {
  // Check localStorage for token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: PERSON_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password, history }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Preparing data to be sent
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('api/persons', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      // res includes token too! (token that's created when registering employee)
      payload: res.data,
    });
    dispatch(setAlert('User Successfully Created', 'success'));
    // we don't have to load employee details when admin registers..(loadUser())
    dispatch(loadPerson());
    history.push('/admin-dashboard');
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

// Login Person
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Preparing data to be sent
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadPerson());
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
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Reset Password
export const resetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Preparing data to be sent
  const body = JSON.stringify({ email });

  try {
    await axios.post('api/reset-password', body, config);
    dispatch(setAlert('Check your email', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Password
export const updatePassword = (password, token, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Preparing data to be sent
  const body = JSON.stringify({ password, token });

  try {
    await axios.post('/api/new-password', body, config);
    dispatch(
      setAlert('Password successfully updated. Please Log In!', 'success')
    );
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

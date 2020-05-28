import axios from 'axios';
import { setAlert } from './alert';

import { RECORD_ERROR, GET_RECORD, CLEAR_RECORD } from './types';

// Create or Update Record by Admin

// history object's push method will redirect after we've submitted the form.
// edit param. will state whether we're creating or updating the profile
export const createAdminRecord = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/records', formData, config);

    dispatch({
      type: GET_RECORD,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Record Updated' : 'Record Created', 'success'));
    // We can't use <Redirect/> to redirect users in actions thus we use history object.
    if (!edit) {
      history.push('/admin-dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RECORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update Record by User

export const createUserRecord = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/records', formData, config);

    dispatch({
      type: GET_RECORD,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Record Updated' : 'Record Created', 'success'));
    // We can't use <Redirect/> to redirect users in actions thus we use history object.
    if (!edit) {
      history.push('/user-dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RECORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get current record
export const getCurrentRecord = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/records/${id}`);

    dispatch({
      type: GET_RECORD,
      payload: res.data,
    });
    history.push('/admin-edit-record');
  } catch (err) {
    dispatch({
      type: RECORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert('Record Not Found!', 'danger'));
  }
};

// Get current record
export const getCurrentRecordUser = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/records/${id}`);

    dispatch({
      type: GET_RECORD,
      payload: res.data,
    });
    history.push('/user-edit-record');
  } catch (err) {
    dispatch({
      type: RECORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert('Record Not Found!', 'danger'));
  }
};

// Admin Delete Record
export const deleteRecord = (id, history) => async (dispatch) => {
  if (window.confirm('Are you sure to delete this record?')) {
    try {
      const res = await axios.delete(`/api/records/${id}`);

      dispatch({
        type: CLEAR_RECORD,
        payload: res.data,
      });
      history.push('/admin-dashboard');
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// User Delete Record
export const deleteRecordUser = (id, history) => async (dispatch) => {
  if (window.confirm('Are you sure to delete this record?')) {
    try {
      const res = await axios.delete(`/api/records/${id}`);

      dispatch({
        type: CLEAR_RECORD,
        payload: res.data,
      });
      history.push('/user-dashboard');
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

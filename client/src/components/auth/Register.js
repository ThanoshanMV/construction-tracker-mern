import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

/**
 * Since it's a form we need to have component state
 * because each input needs to have its own state and also
 * they need to have on change handler, so when we type in it updates
 * the state.
 *
 */

const Register = ({ setAlert, register }) => {
  /**
   * formData = state (an object with all field values)
   * setFormData = a function to update the state.
   */
  const [formData, setFormData] = useState({
    //Defining initial values to state
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Register User</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create User Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='lead' htmlFor='name'>
            Name:
          </label>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='email'>
            Email:
          </label>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='password'>
            Password:
          </label>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='password2'>
            Confirm Password:
          </label>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

/**
 * whenever we use connect, we have to export it.
 * connect takes 2 parameters:
 * 1 : state that you want to map
 * 2 : an object with actions that you want to use.
 */
export default connect(null, { setAlert, register })(Register);

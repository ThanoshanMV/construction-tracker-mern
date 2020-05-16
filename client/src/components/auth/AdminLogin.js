import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Since it's a form we need to have component state
 * because each input needs to have its own state and also
 * they need to have on change handler, so when we type in it updates
 * the state.
 *
 */

const AdminLogin = () => {
  /**
   * formData = state (an object with all field values)
   * setFormData = a function to update the state.
   */
  const [formData, setFormData] = useState({
    //Defining initial values to state
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Admin Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='lead' htmlFor='email'>
            Email:
          </label>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
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
        <input type='submit' className='btn btn-primary' value='Login' />
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AdminLogin;

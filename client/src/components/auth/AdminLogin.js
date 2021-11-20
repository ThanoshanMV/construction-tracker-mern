import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAdmin } from '../../actions/auth';
import { useForm } from "react-hook-form";

/**
 * Since it's a form we need to have component state
 * because each input needs to have its own state and also
 * they need to have on change handler, so when we type in it updates
 * the state.
 *
 */

const AdminLogin = ({ loginAdmin, isAuthenticated }) => {
  /**
   * formData = state (an object with all field values)
   * setFormData = a function to update the state.
   */
   const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = data => {
    loginAdmin(data.email, data.password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/admin-dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Admin Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label className='lead' htmlFor='email'>
            Email:
          </label>
          <input
            type='email'
            {...register("email", {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          />
          {errors.email && <p style = {{color: 'red'}}>Please check the email</p>}
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='password'>
            Password:
          </label>
          <input
            type='password'
            {...register("password", {required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/})}
          />
          {errors.password && <p style = {{color: 'red'}}>Please check the password</p>}
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
        <Link className='btn btn-danger my-1' to='/reset-password'>
          Forgot Password?
        </Link>
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AdminLogin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginAdmin })(AdminLogin);

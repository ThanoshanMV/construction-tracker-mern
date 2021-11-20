import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { resetPassword } from '../../actions/auth';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

const Reset = ({ resetPassword }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => {
    resetPassword(data.email);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label className='lead' htmlFor='email'>
            Email:
          </label>
          <input
            type='email'
            {...register("email", {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          />
        </div>
        {errors.email && <p style = {{color: 'red'}}>Please check the email</p>}
        <input type='submit' className='btn btn-primary' value='Reset' />
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

Reset.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

/**
 * whenever we use connect, we have to export it.
 * connect takes 2 parameters:
 * 1 : state that you want to map
 * 2 : an object with actions that you want to use.
 */
export default connect(mapStateToProps, { setAlert, resetPassword })(
  withRouter(Reset)
);

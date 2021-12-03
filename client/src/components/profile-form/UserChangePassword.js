import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUserPassword } from '../../actions/profile';
import { useForm } from "react-hook-form";

const UserChangePassword = ({ updateUserPassword, history }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => {
    updateUserPassword(data, history);
  };
  return (
    <Fragment>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <p className='lead'>
          <i className='fas fa-user'></i> Change Password
        </p>
        <div className='form-group'>
        <input
            type='password'
            {...register("currentPassword", {required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
          <small className='form-text'>Current Password</small>
          {errors.currentPassword && <p style = {{color: 'red'}}>Please check the current password</p>}
        </div>
        <div className='form-group'>
        <input
            type='password'
            {...register("newPassword", {required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
          <small className='form-text'>New Password</small>
          {errors.newPassword && <p style = {{color: 'red'}}>New password should contain one capital, small letters and the number of characters between 6-15</p>}
        </div>
        <div className='form-group'>
          <input
            type='password'
            {...register("confirmNewPassword", {required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
          <small className='form-text'>Confirm New Password</small>
          {errors.confirmNewPassword && <p style = {{color: 'red'}}>Confirm password should contain one capital, small letters and the number of characters between 6-15</p>}
        </div>
        <input
          type='submit'
          value='Change Password'
          className='btn btn-danger my-1'
        />
        {/* <Link className='btn btn-light my-1' to='/admin-dashboard'>
          Go Back
        </Link> */}
      </form>
    </Fragment>
  );
};

UserChangePassword.propTypes = {
  updateUserPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateUserPassword,
})(withRouter(UserChangePassword));

import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateAdminPassword } from '../../actions/profile';

const AdminChangePassword = ({ updateAdminPassword }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { currentPassword, newPassword, confirmNewPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Creating onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    // adding true as this is an edit form
    updateAdminPassword(formData);
  };
  return (
    <Fragment>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <p className='lead'>
          <i className='fas fa-user'></i> Change Password
        </p>
        <div className='form-group'>
          <input
            type='password'
            name='currentPassword'
            value={currentPassword}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Current Password</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>New Password</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={confirmNewPassword}
            name='confirmNewPassword'
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Confirm New Password</small>
        </div>
        <input
          type='submit'
          value='Change Password'
          className='btn btn-danger my-1'
        />
        <Link className='btn btn-light my-1' to='/admin-dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AdminChangePassword.propTypes = {
  updateAdminPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateAdminPassword,
})(withRouter(AdminChangePassword));

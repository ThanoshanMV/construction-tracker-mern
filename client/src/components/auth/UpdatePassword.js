import React, { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePassword } from '../../actions/auth';

const UpdatePassword = ({ updatePassword, history }) => {
  const [formData, setFormData] = useState({
    //Defining initial values to state
    password: '',
  });

  const { password } = formData;

  const { token } = useParams();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    updatePassword(password, token, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Update Password</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='lead' htmlFor='password'>
            New Password:
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
        <input type='submit' className='btn btn-primary' value='Update' />
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

UpdatePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updatePassword })(UpdatePassword);

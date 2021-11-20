import React, { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePassword } from '../../actions/auth';
import { useForm } from "react-hook-form";

const UpdatePassword = ({ updatePassword, history }) => {
  // const [formData, setFormData] = useState({
  //   //Defining initial values to state
  //   password: '',
  // });
  const { register, formState: { errors }, handleSubmit } = useForm();

  // const { password } = formData;

  const { token } = useParams();

  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (data) => {
    // e.preventDefault();
    updatePassword(data.password, token, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Update Password</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label className='lead' htmlFor='password'>
            New Password:
          </label>
          <input
            type='password'
            {...register("password", {required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        {errors.password && <p style = {{color: 'red'}}>New password should contain one capital, small letters and the number of characters between 6-15</p>}
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

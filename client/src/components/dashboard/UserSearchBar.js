import React, { Fragment, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentRecordUser } from '../../actions/record';

const UserSearchBar = ({ getCurrentRecordUser, history }) => {
  const [formData, setFormData] = useState({
    search: '',
  });

  const { search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Creating onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    getCurrentRecordUser(search, history);
  };

  return (
    <div className='my-2'>
      <p className='lead'>
        <i className='fa fa-search'></i> Search
      </p>

      <form className='example form' onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='Enter Reference Number'
          name='search'
          value={search}
          onChange={(e) => onChange(e)}
        />
        <input type='submit' className='my-1 btn btn-primary' />
      </form>
    </div>
  );
};

UserSearchBar.propTypes = {
  // Our action createAdminProfile is a function
  getCurrentRecordUser: PropTypes.func.isRequired,
};

export default connect(null, { getCurrentRecordUser })(
  withRouter(UserSearchBar)
);

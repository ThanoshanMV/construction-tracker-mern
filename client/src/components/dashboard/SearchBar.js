import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchRecords } from '../../actions/record';

const SearchBar = ({ getSearchRecords }) => {
  const [formData, setFormData] = useState({
    search: '',
  });

  const { search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Creating onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    getSearchRecords(search);
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

SearchBar.propTypes = {
  // Our action createAdminProfile is a function
  getSearchRecords: PropTypes.func.isRequired,
};

export default connect(null, { getSearchRecords })(withRouter(SearchBar));

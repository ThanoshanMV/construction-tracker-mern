import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchRecords } from '../../actions/record';

const SearchBar = ({ getSearchRecords }) => {
  const [formData, setFormData] = useState({
    search: '',
    searchBy: 'filterBy',
  });

  const { search, searchBy } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Creating onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    getSearchRecords(formData);
  };

  return (
    <div className='my-2'>
      <form className='example form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='lead' htmlFor='searchBy'>
            <i className='fa fa-search'></i> Search By
          </label>
          <select
            name='searchBy'
            value={searchBy}
            onChange={(e) => onChange(e)}
          >
            <option value='filterBy'>Filter By</option>
            <option value='referenceNumber'>Reference Number</option>
            <option value='purpose'>Purpose</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <input
          type='text'
          placeholder='Search Here'
          name='search'
          value={search}
          onChange={(e) => onChange(e)}
        />
        <input type='submit' value='Search' className='my-1 btn btn-primary' />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  // Our action createAdminProfile is a function
  getSearchRecords: PropTypes.func.isRequired,
};

export default connect(null, { getSearchRecords })(withRouter(SearchBar));

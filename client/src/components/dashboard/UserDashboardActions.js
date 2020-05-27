import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/user-edit-profile' className='btn btn-light'>
        <i className='fas fa-seedling text-primary'></i> Edit Profile
      </Link>
      <Link to='/user/profile/me' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> View Profile
      </Link>
      <Link to='/user-add-record' className='btn btn-light'>
        <i className='fas fa-plus text-primary'></i> Add Record
      </Link>
    </div>
  );
};

export default UserDashboardActions;

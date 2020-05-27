import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/admin-edit-profile' className='btn btn-light'>
        <i className='fas fa-seedling text-primary'></i> Edit Profile
      </Link>
      <Link to='/admin/profile/me' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> View Profile
      </Link>
      <Link to='/admin-add-record' className='btn btn-light'>
        <i className='fas fa-plus text-primary'></i> Add Record
      </Link>
      <Link to='/register' className='btn btn-light'>
        <i className='fas fa-user-plus text-primary'></i> Add Users
      </Link>
    </div>
  );
};

export default AdminDashboardActions;

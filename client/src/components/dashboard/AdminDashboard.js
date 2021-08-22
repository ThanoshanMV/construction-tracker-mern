import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import AdminDashboardActions from './AdminDashboardActions';
import { getCurrentProfile } from '../../actions/profile';
import SearchBar from './SearchBar';
import AdminRecordDisplay from './AdminRecordDisplay';

const AdminDashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  record: { record },
}) => {
  // Run getCurrentProfile() only once
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <AdminDashboardActions />
          <SearchBar />
          {!Array.isArray(record) || !record.length ? (
            <Fragment></Fragment>
          ) : (
            <AdminRecordDisplay record={record} />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='admin-create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  record: state.record,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  AdminDashboard
);

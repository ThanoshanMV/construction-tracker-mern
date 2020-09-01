import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserDashboardActions from './UserDashboardActions';
import UserSearchBar from './UserSearchBar';
import { getCurrentUserProfile } from '../../actions/profile';
import UserRecordDisplay from './UserRecordDisplay';

const UserDashboard = ({
  getCurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
  record: { record },
}) => {
  // Run getCurrentUserProfile() only once
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

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
          <UserDashboardActions />
          <UserSearchBar />
          {!Array.isArray(record) || !record.length ? (
            <Fragment></Fragment>
          ) : (
            <UserRecordDisplay record={record} />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='user-create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

UserDashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  record: state.record,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(
  UserDashboard
);

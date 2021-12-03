import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getCurrentUserProfile } from '../../actions/profile';

const UserProfile = ({
  getCurrentUserProfile,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <section className='container'>
        <Fragment>
          <Link to='/user-dashboard' className='btn btn-light'>
            Back To Dashboard
          </Link>
          <Link to='/user-edit-profile' className='btn btn-primary'>
            Edit Profile
          </Link>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
        </section>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(UserProfile);

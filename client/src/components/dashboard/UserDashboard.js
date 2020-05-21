import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentEmployeeProfile } from '../../actions/profile';

const UserDashboard = ({ getCurrentEmployeeProfile, auth, profile }) => {
  // Run getCurrentAdminProfile() only once
  useEffect(() => {
    getCurrentEmployeeProfile();
  }, []);

  return <div>UserDashboard</div>;
};

UserDashboard.propTypes = {
  getCurrentEmployeeProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentEmployeeProfile })(
  UserDashboard
);

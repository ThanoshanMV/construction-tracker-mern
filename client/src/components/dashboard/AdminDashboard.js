import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentAdminProfile } from '../../actions/profile';

const AdminDashboard = ({ getCurrentAdminProfile, auth, profile }) => {
  // Run getCurrentAdminProfile() only once
  useEffect(() => {
    getCurrentAdminProfile();
  }, []);

  return <div>AdminDashboard</div>;
};

AdminDashboard.propTypes = {
  getCurrentAdminProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentAdminProfile })(
  AdminDashboard
);

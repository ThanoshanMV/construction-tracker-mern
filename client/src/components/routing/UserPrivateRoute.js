import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const UserPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, isAdmin },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      // NOTE: !loading will always return true when loading has finished.
      // Not Authenticated when loading has finished
      if (!isAuthenticated && !loading) {
        return <Redirect to='/' />;
      }
      // Authenticated when loading but not User (Admin)
      else if (isAuthenticated && !loading && isAdmin) {
        return <Redirect to='/' />;
      }
      // Authenticated when loading and he's a User
      else {
        return <Component {...props} />;
      }
    }}

    /**
     * Default way of providing authenticatin when you have one role user only :
     * !isAuthenticated && !loading ?
     * ( <Redirect to='/' /> ) : ( <Component {...props} /> )
     */
  />
);

UserPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserPrivateRoute);

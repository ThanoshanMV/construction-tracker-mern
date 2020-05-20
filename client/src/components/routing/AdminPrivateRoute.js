import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, isAdmin },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      /**
       * Checking if user not authenticated and not loaded and if that's true we'll redirect him to '/admin-login' and if not we'll redirect him to Component.
       */

      !isAuthenticated && !loading ? (
        <Redirect to='/admin-login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPrivateRoute);

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
    render={(props) => {
      // NOTE: !loading will always return true when loading has finished.
      // Not an Admin when loading has finished.
      if (!isAdmin && !loading) {
        return <Redirect to='/' />;
      } else {
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

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPrivateRoute);

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const UserPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, isUser },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      // NOTE: !loading will always return true when loading has finished.
      // Not a user when loading has finished.
      if (!isUser && !loading) {
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

UserPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserPrivateRoute);

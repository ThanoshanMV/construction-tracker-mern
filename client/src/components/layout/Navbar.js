/**
 * Navbar component
 */

/**
 * By using ES7 React Redux snippets,
 *
 * racfe => creates a functional component
 *
 * component will take the name from the file.
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, isAdmin, loading }, logout }) => {
  const adminDashboard = (
    <ul>
      <li>
        <Link to='/admin-dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users'></i>{' '}
          <span className='hide-sm'>Users</span>
        </Link>
      </li>
    </ul>
  );

  const userDashboard = (
    <li>
      <Link to='/user-dashboard'>
        <i className='fas fa-user'></i>{' '}
        <span className='hide-sm'>Dashboard</span>
      </Link>
    </li>
  );

  const authLinks = (
    <ul>
      {!loading && (
        <Fragment>{isAdmin ? adminDashboard : userDashboard}</Fragment>
      )}
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-building'></i> Construction Tracker
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

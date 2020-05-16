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

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-building'></i> Construction Tracker
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/login'> Admin Login</Link>
        </li>
        <li>
          |<a href='login-user.html'> User Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

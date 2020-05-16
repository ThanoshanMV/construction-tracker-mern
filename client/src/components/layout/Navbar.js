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

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='index.html'>
          <i className='fas fa-building'></i> Construction Tracker
        </a>
      </h1>
      <ul>
        <li>
          <a href='login.html'> Admin Login</a>
        </li>
        <li>
          |<a href='login-user.html'> User Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

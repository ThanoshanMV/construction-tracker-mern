/**
 * Landing component
 */

/**
 * By using ES7 React Redux snippets,
 *
 * racfe => creates a functional component
 *
 * component will take the name from the file.
 */

import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1 className='x-large'>Welcome to Construction Tracker</h1>
        <p className='lead'>Track Construction Status with Ease!</p>
      </div>
    </section>
  );
};

export default Landing;

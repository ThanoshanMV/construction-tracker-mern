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
    <section class='landing'>
      <div class='dark-overlay'>
        <div class='landing-inner'>
          <h1 class='x-large'>Welcome to Construction Tracker</h1>
          <p class='lead'>Track Construction Status with Ease!</p>
        </div>
      </div>
    </section>
  );
};

export default Landing;

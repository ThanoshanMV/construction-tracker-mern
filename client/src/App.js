import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

/**
 * fragment is like a ghost element.
 * It does not show up in the DOM.
 * So we use it instead of div
 */

/**
 * default export related issue solved here:
 * https://stackoverflow.com/questions/44172727/home-does-not-contain-an-export-named-home
 */

const App = () => (
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
);

export default App;

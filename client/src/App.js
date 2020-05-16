import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
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

/**
 * React Router Documentation: https://reacttraining.com/react-router/web/guides/quick-start
 */

/**
 * We have to push section element in the middle thus
 * we put it except for the landing page
 */

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;

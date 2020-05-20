import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import AdminLogin from './components/auth/AdminLogin';
import UserLogin from './components/auth/UserLogin';
import Alert from './components/layout/Alert';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminPrivateRoute from './components/routing/AdminPrivateRoute';
import UserPrivateRoute from './components/routing/UserPrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/auth';
// import { loadAdmin } from './actions/auth';
import { load } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

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

// Check localStorage for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

/**
 * We have to push section element in the middle thus
 * we put it except for the landing page
 */

const App = () => {
  /**
   * For reference Effect hook: https://reactjs.org/docs/hooks-effect.html
   */
  useEffect(() => {
    // store.dispatch(loadUser());
    // store.dispatch(loadAdmin());
    store.dispatch(load());
  }, []);
  // passing empty array ( [] ) as a second param. to run this effect and cleanup only once (on mount and unmount).
  /**
   * For reference on 2nd param.: https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
   */

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/admin-login' component={AdminLogin} />
              <Route exact path='/user-login' component={UserLogin} />
              <AdminPrivateRoute
                exact
                path='/admin-dashboard'
                component={AdminDashboard}
              />
              <UserPrivateRoute
                exact
                path='/user-dashboard'
                component={UserDashboard}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

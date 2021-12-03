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
import AdminCreateProfile from './components/profile-form/AdminCreateProfile';
import UserCreateProfile from './components/profile-form/UserCreateProfile';
import AdminEditProfile from './components/profile-form/AdminEditProfile';
import UserEditProfile from './components/profile-form/UserEditProfile';
import AdminCreateRecord from './components/record-form/AdminCreateRecord';
import UserCreateRecord from './components/record-form/UserCreateRecord';
import AdminEditRecord from './components/record-form/AdminEditRecord';
import UserEditRecord from './components/record-form/UserEditRecord';
import Profiles from './components/profiles/Profiles';
import AdminProfile from './components/profile/AdminProfile';
import UserProfile from './components/profile/UserProfile';

import AdminPrivateRoute from './components/routing/AdminPrivateRoute';
import UserPrivateRoute from './components/routing/UserPrivateRoute';

// reset page
import Reset from './components/auth/Reset';
import UpdatePassword from './components/auth/UpdatePassword';

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
          
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Alert />
            <Switch>
              <Route exact path='/admin-login' component={AdminLogin} />
              <Route exact path='/user-login' component={UserLogin} />
              <Route exact path='/reset-password' component={Reset} />
              <Route exact path='/reset/:token' component={UpdatePassword} />
              <AdminPrivateRoute
                exact
                path='/admin-dashboard'
                component={AdminDashboard}
              />
              <AdminPrivateRoute
                exact
                path='/admin-create-profile'
                component={AdminCreateProfile}
              />
              <AdminPrivateRoute
                exact
                path='/admin-edit-profile'
                component={AdminEditProfile}
              />
              <AdminPrivateRoute exact path='/register' component={Register} />
              <AdminPrivateRoute
                exact
                path='/admin-add-record'
                component={AdminCreateRecord}
              />
              <AdminPrivateRoute
                exact
                path='/admin-edit-record'
                component={AdminEditRecord}
              />
              <AdminPrivateRoute exact path='/profiles' component={Profiles} />
              <AdminPrivateRoute
                exact
                path='/admin/profile/me'
                component={AdminProfile}
              />
              <UserPrivateRoute
                exact
                path='/user/profile/me'
                component={UserProfile}
              />
              <UserPrivateRoute
                exact
                path='/user-dashboard'
                component={UserDashboard}
              />
              <UserPrivateRoute
                exact
                path='/user-create-profile'
                component={UserCreateProfile}
              />
              <UserPrivateRoute
                exact
                path='/user-edit-profile'
                component={UserEditProfile}
              />
              <UserPrivateRoute
                exact
                path='/user-add-record'
                component={UserCreateRecord}
              />
              <UserPrivateRoute
                exact
                path='/user-edit-record'
                component={UserEditRecord}
              />
              <UserPrivateRoute
                exact
                path='/user/profile/me'
                component={AdminProfile}
              />
            </Switch>

        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

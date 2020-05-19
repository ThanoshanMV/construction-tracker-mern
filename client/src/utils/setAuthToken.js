/**
 * This is going to get the token. If the token is there,
 * it'll add it to the headers and if not it'll delete it
 * from the headers.
 */

import axios from 'axios';

// Adding Global Header

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

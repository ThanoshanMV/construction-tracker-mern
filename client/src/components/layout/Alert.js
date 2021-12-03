import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * If we want to interact with component with Redux,
 * whether calling an action or getting the state, we use connect.
 */

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <section className='container'>
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
    </section>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

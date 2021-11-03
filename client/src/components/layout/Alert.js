import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * If we want to interact with component with Redux,
 * whether calling an action or getting the state, we use connect.
 */

const Alert = (props) =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

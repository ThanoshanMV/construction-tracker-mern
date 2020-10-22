import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentRecordUser } from '../../actions/record';
import { withRouter } from 'react-router-dom';

const UserRecordDisplay = ({ record, getCurrentRecordUser, history }) => {
  const records = record.map((rcd) => (
    <tr key={rcd._id}>
      <td>{rcd.referenceNumber}</td>
      <td>{rcd.purpose}</td>
      <td>
        <button
          className='btn btn-primary'
          onClick={() => getCurrentRecordUser(rcd.referenceNumber, history)}
        >
          View
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Record Results</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Ref No</th>
            <th className='hide-sm'>Purpose</th>
            <th />
          </tr>
        </thead>
        <tbody>{records}</tbody>
      </table>
    </Fragment>
  );
};

UserRecordDisplay.propTypes = {
  record: PropTypes.array,
  getCurrentRecordUser: PropTypes.func.isRequired,
};

export default connect(null, { getCurrentRecordUser })(
  withRouter(UserRecordDisplay)
);

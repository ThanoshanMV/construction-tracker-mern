import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Record = ({ record: record }) => {
  // we get record from props
  // record.referenceNumber, record.purpose

  if (!record.referenceNumber) {
    return <Fragment></Fragment>;
  } else {
    return (
      <Fragment>
        <h2 className='my-2'>Construction form details</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Ref. No</th>
              <th className='hide-sm'>Purpose</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr key={record.referenceNumber}>
              <td>{record.referenceNumber}</td>
              <td className='hide-sm'>{record.purpose}</td>
              <td>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;

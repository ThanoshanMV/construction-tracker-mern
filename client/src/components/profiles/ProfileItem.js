import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProfileById } from '../../actions/profile';
import { withRouter } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
  },
  deleteProfileById,
  history,
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <button
          onClick={() => deleteProfileById(_id, history)}
          className='btn btn-danger'
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteProfileById: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteProfileById,
})(withRouter(ProfileItem));

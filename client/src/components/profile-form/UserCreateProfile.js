import React, { Fragment, useState } from 'react';
// to use history object, we use withRouter
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUserProfile } from '../../actions/profile';

const UserCreateProfile = ({ createUserProfile, history }) => {
  const [formData, setFormData] = useState({
    status: '',
    location: '',
    bio: '',
    twitter: '',
    facebook: '',
    instagram: '',
  });

  // Add Socil Network Links Button state implementations
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const { status, location, bio, twitter, facebook, instagram } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createUserProfile(formData, history);
  };

  return (
    <section className='container'>
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information of yours
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='status'
            required
            value={status}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Chairman'>Chairman</option>
            <option value='Member'>Member</option>
            <option value='Technical Officier'>Technical Officier</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>Select your career status</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Your city (eg. Hatton)</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/user-dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
    </section>
  );
};

UserCreateProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
};

export default connect(null, { createUserProfile })(
  withRouter(UserCreateProfile)
);

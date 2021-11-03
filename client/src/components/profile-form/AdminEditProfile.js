import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminChangePassword from './AdminChangePassword';
import {
  createAdminProfile,
  getCurrentProfile,
} from '../../actions/profile';

const AdminEditProfile = ({
  profile: { profile, loading },
  createAdminProfile,
  getCurrentProfile,
  history,
}) => {
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

  // we'll use useEffect to get current profile and fetch them
  useEffect(() => {
    getCurrentProfile();

    // we are checking and fetching the data inside the form
    setFormData({
      status: loading || !profile.status ? '' : profile.status,
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  // [loading] means when loading true, we'll run useEffect

  const { status, location, bio, twitter, facebook, instagram } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Creating onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    // adding true as this is an edit form
    createAdminProfile(formData, history, true);
  };
  return (
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
        <input type='submit' value='Save' className='btn btn-primary my-1' />
      </form>
      <AdminChangePassword />
    </Fragment>
  );
};

AdminEditProfile.propTypes = {
  createAdminProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createAdminProfile,
  getCurrentProfile,
})(withRouter(AdminEditProfile));

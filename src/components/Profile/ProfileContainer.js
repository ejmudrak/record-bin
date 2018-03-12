import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import * as recordActions from '../../redux/actions/creators/recordActions';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';

import Profile from './Profile';

const ProfileContainer = props => (
  <Profile { ...props } />
);

ProfileContainer.propTypes = {
  data: PropTypes.shape({
    userProfile: PropTypes.instanceOf(Object),
  }).isRequired,
  firebase: PropTypes.shape({
    set: PropTypes.func,
  }).isRequired,
  fetchRecord: PropTypes.func.isRequired,
};

const WrappedProfile = firebaseConnect((props) => {
  const uid = get(props, 'firebase.auth.uid', '');
  const myUid = 'PiNBKrYbDqVswjTLq8Ormfe9epH3';

  return [
    'records',
    'users',
    `/userProfile/${myUid}`,
  ];
})(ProfileContainer);

// schemas
const schema = {
  bin: {
    presence: true,
  },
  artist: {
    presence: true,
    length:   {
      maximum: 100,
    },
  },
  record: {
    presence: true,
    length:   {
      maximum: 100,
    },
  },
  type: {
    presence: true,
  },

};
const validateForm = function (form) {
  return validate(form, schema);
};

const handleChange = function (fields, dispatch, { stopSubmit, submitFailed }) {
  if (submitFailed) { stopSubmit(); }
};

const WrappedProfileForm = reduxForm({
  form:     'addRecordForm',
  validate: validateForm,
  onChange: handleChange,
})(WrappedProfile);


export default withRouter(connect(
  state => ({ firebase: state.firebase,
    data:     state.firebase.data,
  }),
  { ...recordActions },
)(WrappedProfileForm));

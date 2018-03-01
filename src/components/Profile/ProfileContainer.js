import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import * as exampleActions from '../../redux/actions/creators/exampleActions';
import Profile from './Profile';

const ProfileContainer = props => (
  <Profile { ...props } />
);

ProfileContainer.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.instanceOf(Array),
    users:   PropTypes.object,
  }).isRequired,
  auth: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  firebase: PropTypes.shape({
    set: PropTypes.func,
  }).isRequired,
};

const WrappedProfile = firebaseConnect((props) => {
  const uid = get(props, 'firebase.auth.uid', '');

  return [
    'records',
    'users',
    `/userProfile/${uid}`,
  ];
})(ProfileContainer);


export default withRouter(connect(
  state => ({ firebase: state.firebase,
    auth:     state.firebase.auth,
    data:     state.firebase.data,
    records:  state.firebase.data.records }),
  { ...exampleActions },
)(WrappedProfile));

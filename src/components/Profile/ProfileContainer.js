import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import * as exampleActions from '../../redux/actions/creators/exampleActions';
import Profile from './Profile';

const ProfileContainer = props => (
  <Profile { ...props } />
);

ProfileContainer.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.object,
    users: PropTypes.object
  }).isRequired,
  firebase: PropTypes.shape({
    set: PropTypes.func
  }).isRequired
};

const WrappedProfile = firebaseConnect([
  'records',
  'users'
])(ProfileContainer);


export default withRouter(connect(
  state => ({ firebase: state.firebase, data: state.firebase.data, records: state.firebase.data.records }),
  { ...exampleActions },
)(WrappedProfile));

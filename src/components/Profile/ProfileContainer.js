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
    userProfile: PropTypes.instanceOf(Object),
  }).isRequired,
  firebase: PropTypes.shape({
    set: PropTypes.func,
  }).isRequired,
  getRecordInfo: PropTypes.func.isRequired,
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


export default withRouter(connect(
  state => ({ firebase: state.firebase,
    data:     state.firebase.data,
  }),
  { ...exampleActions },
)(WrappedProfile));

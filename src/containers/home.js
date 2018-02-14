import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import * as exampleActions from '../redux/actions/creators/exampleActions';
import HomePage from '../presentation/home/homePage';

const Home = (props) => {
  return (
    <HomePage { ...props } />
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.object,
    users: PropTypes.object
  }).isRequired,
  firebase: PropTypes.shape({
    set: PropTypes.func
  }).isRequired
};

const WrappedHome = firebaseConnect((props, firebase) => {
  return [
    'records',
    'users'
  ];
})(Home);


export default withRouter(connect(
  state => ({ firebase: state.firebase, data: state.firebase.data, records: state.firebase.data.records }),
  { ...exampleActions },
)(WrappedHome));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as accountActions from '../../redux/actions/creators/accountActions';
import ForgotPassword from './ForgotPassword';

const ForgotPasswordContainer = function () {
  return (
    <ForgotPassword { ...this.props } />
  );
};

ForgotPasswordContainer.propTypes = {
  sendPasswordResetEmail: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({ account: state.account }),
  { ...accountActions },
)(ForgotPasswordContainer));

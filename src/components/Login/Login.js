import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { get } from 'lodash';
import '../../App.css';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';


const firebaseErrorCodeToFriendlyMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/wrong-password': return 'Invalid Password';
    case 'auth/user-not-found': return 'No user with that email exists';
    default: return 'There was an issue signing in. Please try again';
  }
};

const Login = props => (
  <div >
    <LoginForm onSubmit={ values => props.signIn(values.email, values.password) } />
    <Link to='/forgotpassword'>
      <Button variant='flat'
        label='Forgot Password?'
        primary />
    </Link>
    <Snackbar bodyStyle={ { backgroundColor: '#F44336' } }
      open={ props.account.signInError !== undefined }
      message={ firebaseErrorCodeToFriendlyMessage(get(props, 'account.signInError.code')) }
      autoHideDuration={ 4000 } />
  </div>
);

Login.propTypes = {
  account: PropTypes.shape({
    signInError: PropTypes.shape({
      code:    PropTypes.string,
      message: PropTypes.string,
    }),
  }),
  signIn: PropTypes.func.isRequired,
};

Login.defaultProps = {
  account: {},
};

export default Login;

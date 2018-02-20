import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { get } from 'lodash';
import SocialLoginButton from 'react-social-login-buttons/lib/buttons/SocialLoginButton';
import { Link } from 'react-router-dom';

// MUI Components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import TextInput from '../TextInput';
import './LoginForm.css';

const GoogleLoginButton = (props) => {
  const customProps = {
    style: {
      background: 'white',
      color:      '#808080',
    },
    activeStyle: {
      background: '#eeeeee',
    },
  };

  return (<SocialLoginButton { ...{ ...customProps, ...props } }>
    <img alt=''
      style={ { verticalAlign: 'middle', height: 26, paddingRight: 10 } }
      src='https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png' />
    <span style={ { verticalAlign: 'middle' } }>Log in with Google</span>
  </SocialLoginButton>);
};

const fireBaseErrorCode = (code) => {
  switch (code) {
    case 'auth/account-exists-with-different-credential':
      return 'An account is already associated with this email. Please enter your email and password';
    case 'auth/wrong-password': return 'Invalid Password';
    case 'auth/user-not-found': return 'No user with that email exists';
    default:
      return 'Error Signing In';
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    const { cancelSignInUpForm } = this.props;
    cancelSignInUpForm();
    this.setState({ open: false });
  }

  render() {
    const { account, classes, fullScreen, handleSubmit, error, pristine, submitting, sendSubmit, signInWithFacebook, signInWithGoogle } = this.props;
    const socialSignInError = get(account, 'socialSignInError.code');
    const signInError = get(account, 'signInError.code');

    return (
      <div>
        <Button color='primary' className={ classes.loginButtons } onClick={ this.handleOpen }>Login</Button>

        <Dialog style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }
          open={ this.state.open }
          maxWidth={ false }
          fullScreen={ fullScreen }
          onClose={ this.handleClose }>

          <DialogTitle>Login</DialogTitle>

          <DialogContent style={ { display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 150 } }>
            <div style={ { display: 'flex', flexDirection: 'column', paddingTop: 40 } }>
              <FacebookLoginButton onClick={ () => signInWithFacebook() } text='Log in with Facebook' style={ { marginBottom: 20 } } />
              <GoogleLoginButton onClick={ () => signInWithGoogle() } />
            </div>

            <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
              <div style={ { marginLeft: 75, marginTop: 10, border: '1px solid #979797', height: 60, width: 0 } } />
              <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 75, width: 48, height: 48, borderRadius: '50%', border: '1px solid grey' } }> OR </div>
              <div style={ { marginLeft: 75, border: '1px solid #979797', height: 60, width: 0 } } />
            </div>

            <div style={ { paddingTop: 13, marginLeft: 60 } }>
              <form onSubmit={ handleSubmit }>
                <div>
                  <Field name='email'
                    InputProps={ {
                      placeholder: 'Email Address',
                    } }
                    component={ TextInput }
                    type='email'
                    fullWidth
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </div>
                <div>
                  <Field name='password'
                    InputProps={ {
                      placeholder: 'Password',
                    } }
                    component={ TextInput }
                    type='password'
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </div>
              </form>
              <div id='forgotPasswordContainer'>
                <Link to='/forgotpassword'>
                  <Button color='primary'
                    onClick={ this.handleClose }>
                      Forgot Password?
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
          <DialogActions id='actionContainer'>
            <Button id='signInCancel'
              style={ { textAlign: 'center' } }
              color='primary'
              onClick={ this.handleClose }>
                Cancel
            </Button>
            <Button id='signInSubmit'
              color='primary'
              disabled={ error || pristine || submitting }
              onClick={ () => {
                sendSubmit();
              } }>
                Login
            </Button>
          </DialogActions>
          <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10, color: 'red' } }>
            { signInError ? fireBaseErrorCode(signInError) : socialSignInError ? fireBaseErrorCode(socialSignInError) : '' }
          </div>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  loginButtons: {
    fontSize: '14pt',
  },
});

LoginForm.propTypes = {
  account:            PropTypes.instanceOf(Object).isRequired,
  cancelSignInUpForm: PropTypes.func.isRequired,
  classes:            PropTypes.instanceOf(Object).isRequired,
  fullScreen:         PropTypes.bool.isRequired,
  signInWithGoogle:   PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  handleSubmit:       PropTypes.func.isRequired,
  sendSubmit:         PropTypes.func.isRequired,
};

const styleWrappedLoginForm = withStyles(styles)(LoginForm);

const LoginFormEnriched = reduxForm({
  form: 'signIn',
})(styleWrappedLoginForm);

export default withMobileDialog()(LoginFormEnriched);

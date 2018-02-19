import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { FacebookLoginButton } from 'react-social-login-buttons';
import SocialLoginButton from 'react-social-login-buttons/lib/buttons/SocialLoginButton';
import { connect } from 'react-redux';
import { get } from 'lodash';

// MUI Components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

// Local Components and styles
import TextInput from '../TextInput';
import './SignUp.css';

const validate = (values) => {
  const errors = {};
  if (!values.email || !values.password || !values.confirmPassword) {
    if (!values.email) {
      errors.email = 'You forgot to enter an email!';
    }
    if (!values.password) {
      errors.password = 'You forgot to enter a password!';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'You forgot to confirm your password!';
    }
  }
  if (!values.avatar && !values.photoFile) {
    errors.photoFile = 'Please upload a photo';
  }
  if (values.password && values.confirmPassword && !(values.password === values.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
};

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
    <span style={ { verticalAlign: 'middle' } }>Sign up with Google</span>
  </SocialLoginButton>);
};

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0]);

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta,
  ...props
}) => (
  <div id='fileContainer'>
    <div id='fileText'>
        Profile Picture
    </div>
    <div id='fileInput'>
      <input onChange={ adaptFileEventToValue(onChange) }
        onBlur={ adaptFileEventToValue(onBlur) }
        type='file'
        { ...inputProps }
        { ...props } />
    </div>
    {
      omitMeta.error && omitMeta.touched ? (
        <div>
          <div style={ { color: 'red' } }> {omitMeta.error} </div>
        </div>
      ) : null
    }
  </div>
);

const fireBaseErrorCode = (code) => {
  switch (code) {
    case 'auth/account-exists-with-different-credential':
      return 'An account is already associated with this email. Please enter your email and password';
    case 'auth/email-already-in-use': return 'This email is already in use';
    case 'auth/weak-password': return 'Your password must be at least 6 characters';

    default:
      return 'Error Signing In';
  }
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, continueWithEmail: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false, continueWithEmail: false });
  }

  render() {
    const {
      account, classes, handleSubmit, error, submitting, pristine, sendSubmit,
      signUpWithGoogle, signUpWithFacebook } = this.props;
    const { continueWithEmail } = this.state;
    const socialSignInError = get(account, 'socialSignInError.code');

    return (
      <div>
        <Button color='primary' className={ classes.loginButtons } onClick={ this.handleOpen }>Sign Up</Button>
        <Dialog className={ classes.signUpDialog }
          open={ this.state.open }
          maxWidth={ false }
          onClose={ this.handleClose }>

          <DialogTitle>Sign Up</DialogTitle>

          <DialogContent style={ { width: '100%', marginBottom: 150 } }>

            { continueWithEmail ? (
              <Grid container justify='center' spacing={ 24 } component='form' onSubmit={ handleSubmit } style={ { width: 600 } }>

                <Grid item xs={ 12 }>
                  <Field name='firstName'
                    InputProps={ {
                      placeholder: 'Firstname',
                    } }
                    fullWidth
                    component={ TextInput }
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </Grid>

                <br />

                <Grid item xs={ 12 }>
                  <Field name='lastName'
                    InputProps={ {
                      placeholder: 'Lastname',
                    } }
                    fullWidth
                    component={ TextInput }
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </Grid>

                <br />

                <Grid item xs={ 12 }>
                  <Field name='photoFile'
                    fullWidth
                    component={ FileInput }
                    type='file' />
                </Grid>

                <br />

                <Grid item xs={ 12 }>
                  <Field name='email'
                    InputProps={ {
                      placeholder: 'Email Address',
                    } }
                    fullWidth
                    component={ TextInput }
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </Grid>

                <br />

                <Grid item xs={ 12 }>
                  <Field name='password'
                    InputProps={ {
                      placeholder: 'Password',
                    } }
                    fullWidth
                    component={ TextInput }
                    type='password'
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </Grid>

                <br />

                <Grid item xs={ 12 }>
                  <Field name='confirmPassword'
                    InputProps={ {
                      placeholder: 'Password',
                    } }
                    fullWidth
                    component={ TextInput }
                    type='password'
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
                        sendSubmit();
                      }
                    } } />
                </Grid>
              </Grid>
            ) : (
              <div>
                <div style={ { display: 'flex', flexDirection: 'row' } }>
                  <div style={ { display: 'flex', flexDirection: 'column', paddingTop: 40 } }>
                    <FacebookLoginButton onClick={ () => signUpWithFacebook() } text='Sign up with Facebook' style={ { marginBottom: 20 } } />
                    <GoogleLoginButton onClick={ () => signUpWithGoogle() } />
                  </div>
                  <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
                    <div style={ { marginLeft: 75, marginTop: 10, border: '1px solid #979797', height: 60, width: 0 } } />
                    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 75, width: 48, height: 48, borderRadius: '50%', border: '1px solid grey' } }> OR </div>
                    <div style={ { marginLeft: 75, border: '1px solid #979797', height: 60, width: 0 } } />
                  </div>
                  <div style={ { paddingTop: 80 } }>
                    <Button color='primary' style={ { width: 238, marginLeft: 55 } } onClick={ () => this.setState({ continueWithEmail: true }) }>
                      Sign Up with Email
                    </Button>
                  </div>
                </div>
                <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10, color: 'red' } }>
                  {socialSignInError ? fireBaseErrorCode(socialSignInError) : ''}
                </div>
              </div>
            )}
          </DialogContent>

          <DialogActions>
            <Button color='primary'
              onClick={ this.handleClose }>
                Cancel
            </Button>,
            <Button variant='raised'
              color='primary'
              disabled={ error || pristine || submitting }
              onClick={ () => {
                sendSubmit();
              } }>
                Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  account:            PropTypes.instanceOf(Object).isRequired,
  cancelSignInUpForm: PropTypes.func.isRequired,
  classes:            PropTypes.instanceOf(Object).isRequired,
  signUpWithGoogle:   PropTypes.func.isRequired,
  signUpWithFacebook: PropTypes.func.isRequired,
  handleSubmit:       PropTypes.func.isRequired,
  sendSubmit:         PropTypes.func.isRequired,
};

const styles = theme => ({
  loginButtons: {
    fontSize: '14pt',
  },
  signUpDialog: {
    display:        'flex',
    justifyContent: 'center',
    alignItems:     'center',
  },
});

const styleWrappedSignUpForm = withStyles(styles)(SignUpForm);

const SignUpFormFormEnriched = reduxForm({
  form: 'signUp',
  validate,
})(styleWrappedSignUpForm);

// Decorate with redux-form
const selector = formValueSelector('signUp'); // <-- same as form name
const SignUpFormFormConnected = connect(
  (state) => {
    // can select values individually
    const photoFile = selector(state, 'photoFile');
    return {
      photoFile,
    };
  }
)(SignUpFormFormEnriched);

export default SignUpFormFormConnected;

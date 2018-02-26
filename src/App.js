import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';

// Page components
import Home from './components/Home';
import LinerNotes from './components/LinerNotes';
import Profile from './components/Profile';
import SignUpForm from './components/SignUp/SignUpForm';
import SignInForm from './components/Login/LoginForm';
import ForgotPassword from './components/ForgotPassword/';

// MUI components
import { AppBar, Avatar, Button, Icon, IconButton, ListItemText, ListItemIcon, MenuList, MenuItem, Paper, Snackbar, Toolbar } from 'material-ui';
import Grow from 'material-ui/transitions/Grow';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import { withStyles } from 'material-ui/styles';

// Style and images
import './App.css';
import RecordStore from './rs3.jpg';
import Logo from './logo.png';
import * as accountActions from './redux/actions/creators/accountActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:      false,
      signedOut: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleDropdownOpen = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open:      true,
      anchorEl:  event.currentTarget,
      signedOut: false,
    });
  }

  handleDropdownClose = () => {
    if (!this.state.open) {
      return;
    }

    // setTimeout to ensure a close event comes after a target click event
    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  }

  signOutMessage = () => {
    this.setState({
      signedOut: true,
      open:      false,
    });
  }

  handleSignOutClose = () => {
    this.setState({
      signedOut: false,
    });
  }

  render() {
    const { cancelSignInUpForm, classes, account, profile, auth, firebase,
      history, signUp, signUpWithGoogle, signUpWithFacebook, submitSignUp, signIn,
      signInWithFacebook, signInWithGoogle, submitSignIn, location } = this.props;
    const { showSubMenu } = this.state;
    const photoURL = get(profile, 'photoURL', 'https://goo.gl/2Jd8Lq');
    const uid = get(auth, 'uid');

    const { open, signedOut } = this.state;

    return (
      <div className='container'>
        <img alt='album' className='backgroundImage' src={ RecordStore } />
        <div className='overlay' />
        <div className='midCard' />

        <AppBar className={ classes.appBarRoot }>
          <Toolbar>
            <Link to='/'>
              <img alt='album' className='logo' src={ Logo } />
            </Link>
            <Link to='/profile'>
              <Button className={ classes.appBarButtons }>Your Bin</Button>
            </Link>

            <div className={ classes.accountItemsContainer }>
              { uid ? (
                <Manager>
                  <Target>
                    <div className='avatar-wrapper'
                      aria-owns={ open ? 'menu-list' : null }
                      aria-haspopup='true'
                      onClick={ this.handleDropdownOpen }>
                      <Avatar className='accountIcon avatar' src={ photoURL } />
                      <IconButton>
                        <Icon color='primary' className={ classes.arrowIcon }>keyboard_arrow_down</Icon>
                      </IconButton>
                    </div>
                  </Target>
                  <Popper placement='left-start'
                    eventsEnabled={ open }
                    className={ classNames({ [classes.popperClose]: !open }) }>
                    <ClickAwayListener onClickAway={ this.handleDropdownClose }>
                      <Grow in={ open } id='menu-list' style={ { transformOrigin: '0 0 0' } }>
                        <Paper>
                          <MenuList role='menu'>
                            { uid ? ( // renders dropdown items depending on if logged in
                              <div>

                                <Link onClick={ this.handleDropdownClose } to='/'>
                                  <MenuItem>
                                    <ListItemIcon className={ classes.icon }>
                                      <Icon>account_circle</Icon>
                                    </ListItemIcon>

                                    <ListItemText classes={ { primary: classes.primary } } inset primary='Account Settings' />
                                  </MenuItem>
                                </Link>

                                <MenuItem onClick={ () => { firebase.logout(); this.signOutMessage(); } }>
                                  <ListItemIcon className={ classes.icon }>
                                    <Icon>exit_to_app</Icon>
                                  </ListItemIcon>
                                  <ListItemText classes={ { primary: classes.primary } } inset primary='Log Out' />
                                </MenuItem>
                              </div>
                            ) : (
                              <div />
                            )}
                          </MenuList>
                        </Paper>
                      </Grow>
                    </ClickAwayListener>
                  </Popper>
                </Manager>
              ) : (
                <div className={ classes.loginButtonsContainer } >
                  <SignUpForm onSubmit={ (values) => {
                    const photoFile = values.photoFile || values.avatar;
                    signUp(values.firstName, values.lastName, photoFile, values.email, values.password);
                  } }
                    account={ account }
                    cancelSignInUpForm={ cancelSignInUpForm }
                    signUpWithGoogle={ signUpWithGoogle }
                    signUpWithFacebook={ signUpWithFacebook }
                    sendSubmit={ submitSignUp } />

                  <SignInForm onSubmit={ (values) => {
                    signIn(values.email, values.password);
                  } }
                    account={ account }
                    cancelSignInUpForm={ cancelSignInUpForm }
                    signInWithFacebook={ signInWithFacebook }
                    signInWithGoogle={ signInWithGoogle }
                    sendSubmit={ submitSignIn } />
                </div>
              )}
            </div>

          </Toolbar>
        </AppBar>

        <Snackbar bodyStyle={ { backgroundColor: '#00C853' } }
          open={ this.state.signedOut }
          message={ 'Successfully Logged Out.' }
          autoHideDuration={ 4000 }
          onRequestClose={ this.handleSignOutClose } />

        <Route exact path='/' component={ Profile } />
        <Route exact path='/liner-notes/:artist/:record' component={ LinerNotes } />
        <Route exact path='/profile' component={ Profile } />
        <Route exact path='/forgotpassword' component={ ForgotPassword } />
      </div>
    );
  }
}

const styles = theme => ({
  appBarRoot: {
    backgroundColor: 'transparent',
    boxShadow:       'none',
    position:        'relative',
  },

  appBarButtons: {
    color:    theme.palette.common.white,
    fontSize: '14pt',
  },

  arrowIcon: {
    width:    35,
    height:   35,
    fontSize: '25pt',
  },

  accountItemsContainer: {
    position: 'absolute',
    right:    0,
  },
  loginButtonsContainer: {
    display:       'flex',
    flexDirection: 'row',
  },

  root: {
    display: 'flex',
  },

  paper: {
    marginRight: theme.spacing.unit * 2,
  },

  popperClose: {
    pointerEvents: 'none',
  },

  menuItem: {
    '&:focus': {
      backgroundColor:       theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon:    {},

});

App.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.shape({
    photoURL: PropTypes.string,
  }).isRequired,
  auth: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  cancelSignInUpForm: PropTypes.func.isRequired,
  signUp:             PropTypes.func.isRequired,
  signUpWithGoogle:   PropTypes.func.isRequired,
  signUpWithFacebook: PropTypes.func.isRequired,
  submitSignUp:       PropTypes.func.isRequired,
  signIn:             PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  signInWithGoogle:   PropTypes.func.isRequired,
  submitSignIn:       PropTypes.func.isRequired,
  history:            PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const styleWrappedApp = withStyles(styles)(App);

const wrappedApp = firebaseConnect((props) => {
  const uid = get(props, 'firebase.auth.uid', '');
})(styleWrappedApp);

export default withRouter(connect(
  state => ({ account:  state.account,
    firebase: state.firebase,
    profile:  state.firebase.profile,
    auth:     state.firebase.auth }),
  { ...accountActions },
)(wrappedApp));

import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { omitBy, get } from 'lodash';
import { submit } from 'redux-form';
import { SIGN_IN, SIGN_UP, SIGN_OUT, SEND_PASSWORD_RESET_EMAIL, RESET_PASSWORD } from '../types/accountActionTypes';

const encodeAsFirebaseKey = string => string.replace(/%/g, '%25')
  .replace(/\./g, '%2E')
  .replace(/#/g, '%23')
  .replace(/\$/g, '%24')
  .replace(/\//g, '%2F')
  .replace(/\[/g, '%5B')
  .replace(/\]/g, '%5D');

const migrateOrCreateUserAccountEntry = (uid, emailKey, snapshot, accountDataToSave, accountRef, dispatch, type) => {
  const val = snapshot.val();
  console.log("Val: ", val);
  if (val) {
    // an account already exists, migrate the account
    const accountData = omitBy(accountDataToSave, i => !i);
    console.log("accoundData: ", accountData);

    const nameUpdates = omitBy({ firstName: accountDataToSave.firstName, lastName: accountDataToSave.lastName }, i => !i);
    // migrate the name index with the new uid
    accountRef.child(emailKey).remove();
    if (accountData.photoFile && typeof (accountData.photoFile) !== 'string') {
      firebase.uploadFile(`/images/users/account/${uid}/account_image`, accountData.photoFile).then((response) => {
        accountRef.child(uid).update({
          ...val,
          ...accountData,
          ...nameUpdates,
          photoURL: response.uploadTaskSnaphot.downloadURL,
        });
      });
    } else {
      accountRef.child(uid).update({
        ...val,
        ...nameUpdates,
        ...accountData,
      });
    }
  } else {
    // no row in the userAccount table exists with that email, totally new user
    const accountData = omitBy(accountDataToSave, i => !i);
    if (accountData.photoFile && typeof (accountData.photoFile) !== 'string') {
      firebase.uploadFile(`/images/users/account/${uid}/account_image`, accountData.photoFile).then((response) => {
        accountRef.child(uid).update({
          ...accountData,
          photoURL: response.uploadTaskSnaphot.downloadURL,
        });
      });
    } else {
      const photoUpdate = (accountData.photoFile || accountData.photoURL)
        ? { photoURL: (accountData.photoFile || accountData.photoURL) } : {};
      accountRef.child(uid).update({
        ...accountData,
        ...photoUpdate,
      });
    }
  }
};

const migrate = (accountDataToSave, signUpResult, dispatch, type = 'signUp') => {
  const uid = firebase.auth().currentUser.uid;
  const emailKey = encodeAsFirebaseKey(accountDataToSave.email);
  const accountRef = firebase.database().ref('/userAccount');
  const profilesRef = firebase.database().ref('/userProfiles');
  accountRef.child(emailKey).once('value').then((snapshot) => {
    migrateOrCreateUserAccountEntry(uid, emailKey, snapshot, accountDataToSave, accountRef, dispatch, type);
  });
  profilesRef.child(emailKey).once('value').then((snapshot) => {
    const val = snapshot.val();
    if (val) {
      profilesRef.child(emailKey).remove();
      profilesRef.child(uid).update(val);
    } else {
      profilesRef.child(uid).update({
      });
    }
  });
  return dispatch(push('profile'));
};

export const signIn = (email, password) => dispatch => dispatch({
  type:    SIGN_IN,
  payload: firebase.auth().signInWithEmailAndPassword(email, password),
}).then(() => dispatch(push('profile')));

export const signUp = (firstName, lastName, photoFile, email, password) => dispatch => dispatch({
  type:    SIGN_UP,
  payload: firebase.auth().createUserWithEmailAndPassword(email, password),
}).then((result) => {
  const accountDataToSave = {
    firstName,
    lastName,
    email,
    photoFile,
  };
  migrate(accountDataToSave, result, dispatch);
});

export const signOut = () => dispatch => dispatch({
  type:    SIGN_OUT,
  payload: firebase.auth().signOut(),
}).then(() => dispatch(push('/')));

export const sendPasswordResetEmail = emailAddress => dispatch => dispatch({
  type:    SEND_PASSWORD_RESET_EMAIL,
  payload: firebase.auth().sendPasswordResetEmail(emailAddress),
}).then(() => dispatch(push('login')));

export const updateAuth = result => dispatch => dispatch({
  type: '@@reactReduxFirebase/AUTH_UPDATE_SUCCESS',
  auth: result,
});

export const signUpWithGoogle = () => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.setCustomParameters({
    display: 'popup',
  });
  const fbPromise = firebase.auth().signInWithPopup(provider);
  return dispatch({
    type:    'SIGN_UP_GOOGLE',
    payload: fbPromise,
  }).then(({ value }) => {
    const lastName = get(value, 'additionalUserInfo.profile.family_name', '');
    const firstName = get(value, 'additionalUserInfo.profile.given_name', '');
    const email = get(value, 'additionalUserInfo.profile.email', '');
    const photoURL = get(value, 'additionalUserInfo.profile.picture', '');
    const accountDataToSave = {
      firstName,
      lastName,
      email,
      photoURL,
    };
    migrate(accountDataToSave, value, dispatch);
  });
};

export const signInWithGoogle = () => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.setCustomParameters({
    display: 'popup',
  });
  const fbPromise = firebase.auth().signInWithPopup(provider);
  return dispatch({
    type:    'SIGN_IN_GOOGLE',
    payload: fbPromise,
  }).then(({ value }) => {
    const user = value.user;
    const email = get(user, 'email', '');
    const accountDataToSave = {
      email,
    };
    migrate(accountDataToSave, value, dispatch, 'signIn');
  });
};

export const signInWithFacebook = () => (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('public_profile');
  const fbPromise = firebase.auth().signInWithPopup(provider);
  return dispatch({
    type:    'SIGN_IN_FACEBOOK',
    payload: fbPromise,
  }).then(({ value }) => {
    const displayName = get(value, 'user.displayName', '');
    const email = get(value, 'user.email');
    const defaultEmail = email || `${displayName}@facebook.com`;
    const accountDataToSave = {
      email: defaultEmail,
    };
    migrate(accountDataToSave, value, dispatch, 'signIn');
  });
};

export const signUpWithFacebook = () => (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('public_profile');
  const fbPromise = firebase.auth().signInWithPopup(provider);
  return dispatch({
    type:    'SIGN_UP_FACEBOOK',
    payload: fbPromise,
  }).then(({ value }) => {
    const displayName = get(value, 'user.displayName', '');
    const email = get(value, 'user.email');
    const defaultEmail = email || `${displayName}@facebook.com`;
    const extraUserInfo = get(value, 'additionalUserInfo.profile');
    const firstName = get(extraUserInfo, 'first_name', '');
    const lastName = get(extraUserInfo, 'last_name', '');
    const photoURL = get(extraUserInfo, 'picture.data.url');
    const accountDataToSave = {
      firstName,
      lastName,
      email: defaultEmail,
      photoURL,
    };
    migrate(accountDataToSave, value, dispatch);
  });
};

export const cancelSignInUpForm = () => ({
  type: 'Cancel_Sign_In_Up_Form',
});

export const submitSignUp = () => dispatch => dispatch(submit('signUp'));

export const submitSignIn = () => dispatch => dispatch(submit('signIn'));

export const remoteSubmitForm = formName => dispatch => dispatch(submit(formName));

export const resetPassword = newPassword => dispatch => dispatch({
  type:    RESET_PASSWORD,
  payload: firebase.auth().currentUser.updatePassword(newPassword),
});

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from 'react-redux-firebase';
import account from '../reducers/accountReducer';

export default combineReducers({
  routing:  routerReducer,
  form:     formReducer,
  firebase: firebaseStateReducer,
  account,
});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import * as firebase from 'firebase';
import { MuiThemeProvider } from 'material-ui';

// theme
import theme from './assets/theme';

import { configureStore } from './redux/store/configureReduxStore';
import App from './App';
import './index.css';

const firebaseConfig = {
  apiKey:        'AIzaSyDx1OVTPG3yeWKXL4Lt1_mVRLeApKOBfJU',
  authDomain:    'record-bin-mudrak.firebaseapp.com',
  databaseURL:   'https://record-bin-mudrak.firebaseio.com',
  projectId:     'record-bin-mudrak',
  storageBucket: 'record-bin-mudrak.appspot.com',
};

firebase.initializeApp(firebaseConfig);

const target = document.getElementById('root');
const history = createHistory();
const store = configureStore(history, firebase);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <MuiThemeProvider theme={ theme }>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>, target);

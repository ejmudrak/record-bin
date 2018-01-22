import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import * as firebase from 'firebase'

// theme
import theme from './assets/theme';
import { MuiThemeProvider } from 'material-ui';

import { configureStore } from './redux/store/configureReduxStore'
import App from './App'
import './index.css'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)

const target = document.getElementById('root')
const history = createHistory()
const store = configureStore(history, firebase)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={ theme } >
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>, target)

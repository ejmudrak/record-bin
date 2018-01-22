import React from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { get } from 'lodash'
import PropTypes from 'prop-types'

// Page components
import Bin from './presentation/home/homePage'

// Style and images
import './App.css'
import RecordStore from './rs3.jpg';
import Record from './record.png';
import Logo from './logo.png';

class App extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className='container'>
        <img alt="album" className='backgroundImage' src={RecordStore} />
        <div className='overlay' />
        <div className='midCard' />

        <nav className='appBar'>
          <a href='#'>
            <img alt="album" className='logo' src={Logo} />
          </a>
          <a className='barItem' href='#'>Bin</a>
          <a className='barItem' href='#'>Discover</a>
          <a className='barItem' href='#'>Feed</a>
        </nav>

        <div className='heading'>Your Record Bin</div>
        <div className='recordImageWrapper'>
          <img alt="record" className='recordImage' src={Record} />
        </div>

        <Bin />

        {/*<Route exact path="/" component={Home} />*/}
      </div>
    )
  }
}

App.propTypes = {

}

App.defaultProps = {

}

const wrappedApp = firebaseConnect((props) => {
  const uid = get(props, 'firebase.auth.uid', '')
})(App)

export default withRouter(connect(
  state => ({ firebase: state.firebase,  }),
)(wrappedApp))

import React from 'react'
import { Route, Link } from 'react-router-dom'
// import { Route, Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { firebaseConnect } from 'react-redux-firebase'
// import { get } from 'lodash'
// import PropTypes from 'prop-types'

// Page components
import Home from './presentation/home/homePage'
import LinerNotes from './containers/linerNotes/LinerNotes'

// Style and images
import './App.css'
import RecordStore from './rs3.jpg';
import Logo from './logo.png';

class App extends React.Component {

  render() {
    return (
      <div className='container'>
        <img alt="album" className='backgroundImage' src={RecordStore} />
        <div className='overlay' />
        <div className='midCard' />

        <nav className='appBar'>
          <a href='/'>
            <img alt="album" className='logo' src={Logo} />
          </a>
          <Link to="/"><a className='barItem' href='/'>Record Bin</a></Link>
          <Link to="/"><a className='barItem' href='/'>Discover</a></Link>
          <Link to="/"><a className='barItem' href='/'>Feed</a></Link>
        </nav>

        <Route exact path="/" component={Home} />
        <Route exact path="/liner-notes" component={LinerNotes} />
      </div>
    )
  }
}

// App.propTypes = {

// }

// App.defaultProps = {

// }

// const wrappedApp = firebaseConnect((props) => {
// })(App)

// export default withRouter(connect(
//   state => ({ firebase: state.firebase,  }),
// )(wrappedApp))

export default App

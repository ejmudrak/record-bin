import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LinerNotes from '../../presentation/linerNotes/LinerNotes'

class LinerNotesContainer extends React.Component {
  render() {
    return (
      <LinerNotes {...this.props} />
    )
  }
}

// LinerNotesContainer.propTypes = {
// }

export default withRouter(connect(
  state => ({ home: state.home }),
)(LinerNotesContainer))

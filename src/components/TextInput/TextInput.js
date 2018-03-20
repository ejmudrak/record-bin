import PropTypes from 'prop-types';
import React, { Component } from 'react';

// components
import { FormHelperText, TextField } from 'material-ui';

class TextInput extends Component {
  static propTypes = {
    containerClassName: PropTypes.string,
    errorClassName:     PropTypes.string,
    input:              PropTypes.instanceOf(Object).isRequired,
    meta:               PropTypes.instanceOf(Object).isRequired,
  }

  static defaultProps = {
    containerClassName: '',
    errorClassName:     '',
  }

  shouldDisplayError = () => {
    const {
      meta: {
        active,
        dirty,
        error,
        touched,
      },
    } = this.props;

    return error && !active && (dirty || touched);
  }

  renderError = () => {
    const { errorClassName, meta: { error } } = this.props;

    let element;

    if (this.shouldDisplayError()) {
      element = (
        <FormHelperText className={ errorClassName } error>
          { error[0] }
        </FormHelperText>
      );
    }

    return element;
  }

  render() {
    const {
      containerClassName,
      errorClassName,
      input,
      ...rest
    } = this.props;

    return (
      <div className={ containerClassName }>
        <TextField error={ this.shouldDisplayError() } { ...input } { ...rest } />

        { this.renderError() }
      </div>
    );
  }
}

export default TextInput;

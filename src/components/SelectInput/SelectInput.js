import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

// components
import { FormHelperText, MenuItem, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

class SelectInput extends Component {
  static propTypes = {
    classes:            PropTypes.instanceOf(Object).isRequired,
    containerClassName: PropTypes.string,
    errorClassName:     PropTypes.string,
    input:              PropTypes.instanceOf(Object).isRequired,
    meta:               PropTypes.instanceOf(Object).isRequired,
    options:            PropTypes.instanceOf(Array),
    id:                 PropTypes.string,
    label:              PropTypes.string,
    helpertext:         PropTypes.string,
  }

  static defaultProps = {
    containerClassName: '',
    errorClassName:     '',
    options:            [],
    id:                 '',
    label:              '',
    helpertext:         '',
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
    const { helpertext, errorClassName, meta: { error } } = this.props;

    let element;

    if (this.shouldDisplayError()) {
      element = (
        <FormHelperText className={ errorClassName } error>
          { error[0] }
        </FormHelperText>
      );
    } else {
      element = (
        <FormHelperText>
          { helpertext }
        </FormHelperText>
      );
    }

    return element;
  }

  renderOptions = () => {
    const { options } = this.props;

    const elements = [];

    options.forEach((option) => {
      elements.push(
        <MenuItem key={ option.value } value={ option.value }>
          { option.label }
        </MenuItem>
      );
    });

    return elements;
  }

  render() {
    const {
      classes,
      label,
      id,
      containerClassName,
      errorClassName,
      input,
      options,
      ...rest
    } = this.props;


    return (
      <FormControl className={ classNames(containerClassName, classes.formControl) }>
        {
          Boolean(label) && <InputLabel htmlFor={ id }>{ label }</InputLabel>
        }

        <Select id={ id }
          error={ this.shouldDisplayError() }
          inputProps={ { id, ...input } }
          value={ input.value }
          { ...rest }>

          { this.renderOptions() }
        </Select>

        { this.renderError() }
      </FormControl>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width:  '100%',
  },
});

export default withStyles(styles)(SelectInput);

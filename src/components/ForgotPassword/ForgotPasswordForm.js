import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import Button from 'material-ui/Button';

const ForgotPasswordForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <Field name='email'
          component={ TextInput }
          InputProps={ {
            placeholder: 'Email Address',
          } }
          type='email' />
      </div>
      <Button type='submit'>Reset Password</Button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const ForgotPasswordFormEnriched = reduxForm({
  form: 'forgotPassword',
})(ForgotPasswordForm);

export default ForgotPasswordFormEnriched;

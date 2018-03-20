import { reduxForm } from 'redux-form';
import validate from 'validate.js';

import AddRecordForm from './AddRecordForm';

// schemas
const schema = {
  bin: {
    presence: true,
  },
  artist: {
    presence: true,
    length:   {
      maximum: 100,
    },
  },
  record: {
    presence: true,
    length:   {
      maximum: 100,
    },
  },
  type: {
    presence: true,
  },

};
const validateForm = function (form) {
  return validate(form, schema);
};

const handleChange = function (fields, dispatch, { stopSubmit, submitFailed }) {
  if (submitFailed) { stopSubmit(); }
};

export default reduxForm({
  form:     'addRecordForm',
  validate: validateForm,
  onChange: handleChange,
})(AddRecordForm);

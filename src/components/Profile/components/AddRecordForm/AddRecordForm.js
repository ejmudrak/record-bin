// General Imports:
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { get } from 'lodash';
import PropTypes from 'prop-types';

// Material UI imports
import { Button, Grid, withStyles } from 'material-ui';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

// Local imports:
import TextInput from '../../../TextInput';
import SelectInput from '../../../SelectInput';

class AddRecordForm extends Component {
  static propTypes = {
    classes:              PropTypes.instanceOf(Object).isRequired,
    // data:    PropTypes.shape({
    //   userProfile: PropTypes.instanceOf(Object),
    // }).isRequired,
    handleAddRecordClose: PropTypes.func.isRequired,
    handleSubmit:         PropTypes.func.isRequired,
    fullScreen:           PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      addRecordOpen: false,
    };
  }

  getRecordBins = () => {
    // const { data } = this.props;
    // const uid = 'PiNBKrYbDqVswjTLq8Ormfe9epH3';

    // const bins = get(data, `userProfile.${uid}.bins`, []);

    const items = [
      { value: 0, label: 'Current Faves' },
      { value: 1, label: 'Top Albums Ever' },
    ];

    return items;
  }

  getRecordTypeOptions = () => {
    const items = [
      { value: 0, label: 'Album' },
      { value: 1, label: 'Track' },
    ];

    return items;
  }

  render() {
    const { classes, fetchRecord, fullScreen, handleAddRecordClose, handleSubmit } = this.props;

    return (
      <div>
        <DialogTitle id='delete-field-title'>Add a new record to your bin!</DialogTitle>

        <DialogContent>
          <DialogContentText>
              Select your bin, enter artist and record info, and build your collection.
          </DialogContentText>

          <Grid container spacing={ 24 }>

            <Grid item xs={ 12 } >
              <Field name='bin'
                id='bin'
                label='Select A Bin'
                component={ SelectInput }
                options={ this.getRecordBins() }
                fullWidth
                required />
            </Grid>

            <Grid item xs={ 12 } >
              <Field name='artist'
                label='Artist'
                type='text'
                component={ TextInput }
                fullWidth
                required />
            </Grid>

            <Grid item xs={ 12 } >
              <Field name='record'
                label='Record'
                type='text'
                component={ TextInput }
                fullWidth
                required />
            </Grid>

            <Grid item xs={ 12 } >
              <Field name='type'
                id='type'
                label='Select record type'
                component={ SelectInput }
                options={ this.getRecordTypeOptions() }
                fullWidth
                required />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleAddRecordClose } color='primary' autoFocus>
              Cancel
          </Button>
          <Button variant='raised' color='primary' onClick={ handleSubmit } >
              Add Record
          </Button>
        </DialogActions>
      </div>
    );
  }
}

const styles = theme => ({
  addRecordButton: {
    position: 'fixed',
    zIndex:   100,
    right:    20,
    bottom:   20,
  },

});

export default withMobileDialog()(withStyles(styles)(AddRecordForm));

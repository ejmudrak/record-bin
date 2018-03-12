// General Imports:
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { get } from 'lodash';
import PropTypes from 'prop-types';

// Material UI imports
import { Button, Grid, Icon, withStyles } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

// Local imports:
import './Profile.css';
import Record from './assets/record.png';
import RecordSlider from './components/RecordSlider';
import TextInput from '../TextInput';

/* IDEAS & TO-DO:
    + Top 5, Top Tier, and Other Favorites bins:
        + Show all album art at once for Top 5
        + Flip through Top Tier and Other Favorites
    + 3D Transform record bin, like the hip-hop Google Doodle
    + Liner notes page:
        + Tracklist
        + Story
        + Music player
    + Controls UI on record bin:
        + Icon for albums with liner notes
        + Link to more info about band/albums
        + Arrows for flipping through albums
    + Use JS map fn for JSON albums to displayed

  New Ideas:
    + Allow for sorting of entire collection by genre, title, color
    + Drag and drop customization of bins
    + Bin creation: thematically organize albums
    + Single tracks
    + Tie location to user and their liner notes
*/

class Profile extends Component {
  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    data:    PropTypes.shape({
      userProfile: PropTypes.instanceOf(Object),
    }).isRequired,
    fetchRecord: PropTypes.func.isRequired,
    fullScreen:  PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      addRecordOpen: false,
    };
  }

  handleAddRecordOpen = () => {
    this.setState({ addRecordOpen: true });
  };

  handleAddRecordClose = () => {
    this.setState({ addRecordOpen: false });
  };

  render() {
    const { classes, data, fetchRecord, fullScreen } = this.props;
    const { addRecordOpen } = this.state;

    const uid = 'PiNBKrYbDqVswjTLq8Ormfe9epH3';
    const bin = 0;
    const records = get(data, `userProfile.${uid}.bins.${bin}.records`, []);
    const recordsTwo = get(data, `userProfile.${uid}.bins.${1}.records`, []);
    const binName = get(data, `userProfile.${uid}.bins.${bin}.name`, []);
    const binNameTwo = get(data, `userProfile.${uid}.bins.${1}.name`, []);

    return (
      <Grid container>

        <Grid item xs={ 12 }>
          <img alt='record' className={ classes.recordImage } src={ Record } />
        </Grid>

        <Grid item xs={ 12 } className={ classes.binContainer }>

          <div className='binFront'>
            <div className='binLabelContainer'>
              <div className='binLabelText'>{ binName }</div>
            </div>
          </div>

          <div className='binBack'>
            <RecordSlider records={ records } fetchRecord={ fetchRecord } />
          </div>

        </Grid>

        <Grid item xs={ 12 } className={ classes.binContainer }>

          <div className='binFront'>
            <div className='binLabelContainer'>
              <div className='binLabelText'>{ binNameTwo }</div>
            </div>
          </div>

          <div className='binBack'>
            <RecordSlider records={ recordsTwo } fetchRecord={ fetchRecord } />
          </div>

        </Grid>

        <Button variant='fab'
          color='primary'
          className={ classes.addRecordButton }
          onClick={ this.handleAddRecordOpen }>

          <Icon>add</Icon>
        </Button>

        <Dialog fullScreen={ fullScreen }
          open={ addRecordOpen }
          onClose={ this.handleAddRecordClose }
          aria-labelledby='delete-field-title'>

          <DialogTitle id='delete-field-title'>Add a new record to your bin!</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Select your bin, enter artist and record info, and build your collection.
            </DialogContentText>

            <Grid container spacing={ 24 }>

              <Grid item xs={ 12 } >
                <Field name='bin'
                  label='Select A Bin'
                  type='text'
                  component={ TextInput }
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
                  label='Select record type'
                  type='text'
                  component={ TextInput }
                  fullWidth
                  required />
              </Grid>

            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={ this.handleAddRecordClose } color='primary' autoFocus>
              Cancel
            </Button>
            <Button variant='raised' color='primary' onClick={ this.handleAddRecord } >
              Add Record
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

const styles = theme => ({
  heading: {
    fontFamily: '"Galano", Lato',
    color:      '#fff',
    fontSize:   60,
    marginLeft: 50,
  },

  recordImage: {
    float:                          'right',
    marginRight:                    35,
    animation:                      'spin 5s infinite linear',
    borderRadius:                   '100%',
    boxShadow:                      '0px 0px 100px 1px #888888',
    [theme.breakpoints.down('sm')]: {
      width:  400,
      height: 400,
    },
  },

  binContainer: {
    marginTop:                      -45,
    [theme.breakpoints.down('sm')]: {
      marginTop: -100,
    },
  },

  addRecordButton: {
    position: 'fixed',
    zIndex:   100,
    right:    20,
    bottom:   20,
  },

});

export default withMobileDialog()(withStyles(styles)(Profile));

// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';

// Material UI imports
import { Grid, withStyles } from 'material-ui';

// Local imports:
import './Profile.css';
import Record from './assets/record.png';
import RecordSlider from './components/RecordSlider';

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

const bins = [
  {
    albums: 5,
    label:  'My Top 5',
  },
  {
    albums: 5,
    label:  'College Survival Guide',
  },
  {
    albums: 5,
    label:  'What I Grew Up On',
  },
];

const RecordBin = (props) => {
  const { classes, data } = props;
  const records = get(data, 'records', {});
  const albumTitle = get(data, 'records["0"]');
  console.log('Records: ', records);
  console.log('Album title: ', albumTitle);

  return (
    <Grid container>

      <Grid item xs={ 12 }>
        <img alt='record' className={ classes.recordImage } src={ Record } />
      </Grid>

      <Grid item xs={ 12 } className={ classes.binContainer }>

        <div className='binFront'>
          <div className='binLabelContainer'>
            <div className='binLabelText'>{ bins[0].label }</div>
          </div>
        </div>

        <div className='binBack'>
          <RecordSlider props={ { records, albumTitle } } />
        </div>

      </Grid>

      <Grid item xs={ 12 } className={ classes.binContainer }>

        <div className='binFront'>
          <div className='binLabelContainer'>
            <div className='binLabelText'>{ albumTitle }</div>
          </div>
        </div>

        <div className='binBack'>
          <RecordSlider props={ { records, albumTitle } } />
        </div>

      </Grid>

    </Grid>
  );
};

RecordBin.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data:    PropTypes.shape({
    records: PropTypes.object,
    users:   PropTypes.object,
  }).isRequired,
};

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
});

export default withStyles(styles)(RecordBin);

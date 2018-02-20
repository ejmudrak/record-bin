// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';

// Material UI imports
import Grid from 'material-ui/Grid';

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
  const { data } = props;
  const records = get(data, 'records', {});
  const albumTitle = get(data, 'records["0"]');
  console.log('Records: ', records);
  console.log('Album title: ', albumTitle);

  return (
    <div>
      <Grid container>

        <Grid item xs={ 6 }>
          <div className='heading'>Your Record Bin</div>
        </Grid>

        <Grid item xs={ 6 }>

          <div>
            <img alt='record' className='recordImage' src={ Record } />
          </div>

        </Grid>

        <Grid item xs={ 12 } style={ { marginTop: 10 } }>

          <div className='binFront'>
            <div className='binLabelContainer'>
              <div className='binLabelText'>{ bins[0].label }</div>
            </div>
          </div>

          <div className='binBack'>
            <RecordSlider props={ { records, albumTitle } } />
          </div>

        </Grid>

        <Grid item xs={ 12 } style={ { marginTop: 10 } }>

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
    </div>
  );
};

RecordBin.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.object,
    users:   PropTypes.object,
  }).isRequired,
};

RecordBin.defaultProps = {
};

export default RecordBin;

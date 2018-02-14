// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';

// Material UI imports
import Grid from 'material-ui/Grid';

// Style and images:
import './homePage.css';
import Record from './record.png';
import Chance from './chance.png';
import Kanye from './kanye.jpg';
import Paak from './paak.png';
import Frank from './frank.jpg';
import GlassAnimals from './glass_animals.jpg';


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
    label: 'My Top 5'
  },
  {
    albums: 5,
    label: 'College Survival Guide'
  },
  {
    albums: 5,
    label: 'What I Grew Up On'
  }
];

const RecordBin = (props) => {
  const { data } = props;
  const records = get(data, 'records', {});
  const albumTitle = get(data, 'records.0');
  console.log('Album title: ', records);

  return (
    <div>
      <Grid container>
        <Grid item xs={ 6 }>
          <div className="heading">Your Record Bin</div>
        </Grid>

        <Grid item xs={ 6 } style={ { marginTop: '5em' } }>
          <div className="recordImageWrapper">
            <img alt="record" className="recordImage" src={ Record } />
          </div>
        </Grid>

        <Grid item xs={ 12 } style={ { marginTop: '-2em' } }>
          <div className="binFront">
            <div className="binLabelContainer">
              <div className="binLabelText">{ albumTitle }</div>
            </div>
          </div>
          <div className="binBack">
            <Grid container justify="center" spacing={ 24 } style={ { marginTop: '40px' } }>
              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Chance } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Kanye } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Paak } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Frank } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ GlassAnimals } /></Link>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={ 12 }>
          <div className="binFront">
            <div className="binLabelContainer">
              <div className="binLabelText">{bins[1].label}</div>
            </div>
          </div>
          <div className="binBack">
            <Grid container justify="center" spacing={ 24 } style={ { marginTop: '40px' } }>
              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Chance } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Kanye } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Paak } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Frank } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ GlassAnimals } /></Link>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={ 12 }>
          <div className="binFront">
            <div className="binLabelContainer">
              <div className="binLabelText">{bins[2].label}</div>
            </div>
          </div>
          <div className="binBack">
            <Grid container justify="center" spacing={ 24 } style={ { marginTop: '40px' } }>
              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Chance } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Kanye } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Paak } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ Frank } /></Link>
              </Grid>

              <Grid item xs={ 2.4 }>
                <Link to="liner-notes"><Album className="album" image={ GlassAnimals } /></Link>
              </Grid>
            </Grid>
          </div>
        </Grid>

      </Grid>
    </div>
  );
};

const Album = (props) => {
  const { image } = props;
  return (
    <div>
      <img alt="album" className="album" src={ image } />
    </div>
  );
};

Album.propTypes = {
};

RecordBin.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.object,
    users: PropTypes.object
  }).isRequired
};

RecordBin.defaultProps = {
};

export default RecordBin;

// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ImageSlider from 'react-slick';

// Material UI imports
import { ButtonBase, Grid, withStyles } from 'material-ui';

// Style and images:
import './RecordSlider.css';
import Chance from './assets/chance.png';
import Kanye from './assets/kanye.jpg';
import Paak from './assets/paak.png';
import Frank from './assets/frank.jpg';
import GlassAnimals from './assets/glass_animals.jpg';
import Kendrick from './assets/kendrick.jpg';
import Tyler from './assets/tyler.jpg';
import Brockhampton from './assets/brockhampton.jpg';
import Vince from './assets/vince.jpg';

const RecordSlider = function (props) {
  const { albumTitle, classes, records } = props;
  const albumNames = [
    'Chance', 'Kanye', 'Paak', 'Frank', 'GlassAnimals', 'Kendrick', 'Tyler', 'Brockhampton', 'Vince',
  ];

  const sliderSettings = {
    dots:           false,
    infinite:       false,
    speed:          500,
    swipeToSlide:   true,
    slidesToShow:   5,
    slidesToScroll: 1,
    nextArrow:      <Arrow direction='nextArrow' />,
    prevArrow:      <Arrow direction='prevArrow' />,
    responsive:     [
      { breakpoint: 400,
        settings:   {
          slidesToShow:   1,
          centerMode:     true,
          slidesToScroll: 1,
          arrows:         false,
        } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
    ],
  };

  return (

    <Grid container spacing={ 8 } justify='center' className={ classes.records }>
      <ImageSlider className={ classes.imageSlider } { ...sliderSettings }>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Chance } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Kanye } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Paak } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Frank } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Brockhampton } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Vince } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ Kendrick } /></Link>
          </ButtonBase>
        </Grid>

        <Grid item xs>
          <ButtonBase>
            <Link to='liner-notes'><Album image={ GlassAnimals } /></Link>
          </ButtonBase>
        </Grid>

      </ImageSlider>

    </Grid>
  );
};


const Album = (props) => {
  const { image } = props;
  return (
    <div>
      <img alt='album' className='album' src={ image } />
    </div>
  );
};

const Arrow = ({ className, style, onClick, direction }) => (
  <button className={ [className, direction].join(' ') }
    onClick={ onClick } />
);

const styles = theme => ({
  records: {
    marginTop: 50,
  },

  imageSlider: {
    width:       '100%',
    paddingLeft: 15,
  },
});

RecordSlider.propTypes = {
  classes:    PropTypes.instanceOf(Object).isRequired,
  records:    PropTypes.instanceOf(Object).isRequired,
  albumTitle: PropTypes.string.isRequired,
};


export default withStyles(styles)(RecordSlider);
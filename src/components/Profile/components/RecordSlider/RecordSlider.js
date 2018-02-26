// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ImageSlider from 'react-slick';
import LastFM from 'last-fm';

// Material UI imports
import { ButtonBase, Grid, withStyles } from 'material-ui';

// Style and images:
import './RecordSlider.css';

const lastfm = new LastFM('da0881e1793be56a2618b937f536389c', { userAgent: 'Record Bin' });

const albumNames = [
  {
    artist: 'Chance The Rapper',
    album:  'Coloring Book',
  },
  {
    artist: 'Kanye West',
    album:  'Late Registration',
  },
  {
    artist: 'Anderson .Paak',
    album:  'Malibu',
  },
  {
    artist: 'Brockhampton',
    album:  'Saturation III',
  },
  {
    artist: 'Vince Staples',
    album:  'Big Fish Theory',
  },
  {
    artist: 'Frank Ocean',
    album:  'Channel Orange',
  },
  {
    artist: 'Kendrick Lamar',
    album:  'Damn.',
  },
];

const albumData = [];

albumNames.map((item) => {
  lastfm.albumInfo({ name: item.album, artistName: item.artist }, (err, data) => {
    if (err) console.error(err);
    else {
      albumData.push(data);
    }
  });
});

class RecordSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: [],
    };
  }


  render() {
    const { albumTitle, classes, records } = this.props;
    console.log('Album Data', albumData);

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
          { albumData.map(album => (
            <Grid item xs key={ album.name }>
              <ButtonBase>
                <Link to={ `liner-notes/${album.artistName}/${album.name}` }>
                  <Album image={ album.images[4] } />
                </Link>
              </ButtonBase>
            </Grid>
          )
          )}

        </ImageSlider>
      </Grid>
    );
  }
}


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

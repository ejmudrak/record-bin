// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageSlider from 'react-slick';
import fetch from 'cross-fetch';

// Material UI imports
import { ButtonBase, CircularProgress, Grid, withStyles } from 'material-ui';

// Style and images:
import './RecordSlider.css';

class RecordSlider extends React.Component {
  static propTypes = {
    classes:     PropTypes.instanceOf(Object).isRequired,
    records:     PropTypes.instanceOf(Object).isRequired,
    fetchRecord: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      recordsData:    [],
      loading:        true,
      recordsDataNew: {
        isFetching:    false,
        didInvalidate: false,
        lastUpdated:   '',
        items:         [],
      },

    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const { fetchRecord, records } = this.props;

    const recordsData = [];

    const recordsArray = Object.values(records);

    const baseURL = '//ws.audioscrobbler.com/2.0/';
    const method = 'album.getInfo';
    const apiKey = 'da0881e1793be56a2618b937f536389c';

    recordsArray.forEach((item) => {
      const url = `${baseURL}?method=${method}&artist=${item.artist}&album=${item.record}&api_key=${apiKey}&format=json`;

      fetchRecord(item.artist, item.record);

      (async () => {
        try {
          const res = await fetch(url);

          if (res.status >= 400) {
            throw new Error('Bad response from server');
          }

          const newRecord = await res.json();
          recordsData.push(newRecord);
        } catch (err) {
          console.error(err);
        }
        this.setState({ recordsData, loading: false });
      })();
    });
  };

  render() {
    const { classes } = this.props;
    const { recordsData, loading } = this.state;

    const sliderSettings = {
      dots:           false,
      infinite:       false,
      speed:          500,
      swipeToSlide:   true,
      slidesToShow:   5,
      slidesToScroll: 2,
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
        { loading ? (
          <CircularProgress className={ classes.loading } />
        ) : (
          <ImageSlider className={ classes.imageSlider } { ...sliderSettings }>
            { recordsData.map(record => (
              <Grid item xs key={ record.album.name }>
                <ButtonBase>
                  <Link to={ `liner-notes/${record.album.artist}/${record.album.name}` }>
                    <Album image={ record.album.image[2]['#text'] } />
                  </Link>
                </ButtonBase>
              </Grid>
            )
            )}
          </ImageSlider>
        )
        }
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

const styles = () => ({
  records: {
    marginTop: 50,
  },

  loading: {
    marginTop: 100,
  },

  imageSlider: {
    width:       '100%',
    paddingLeft: 15,
  },
});

export default withStyles(styles)(RecordSlider);

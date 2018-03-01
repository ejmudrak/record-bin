// General Imports:
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageSlider from 'react-slick';
import LastFM from 'last-fm';

// Material UI imports
import { ButtonBase, Grid, withStyles } from 'material-ui';

// Style and images:
import './RecordSlider.css';

const myKey = 'da0881e1793be56a2618b937f536389c';
// const extraKey = '57ee3318536b23ee81d6b27e36997cde';
const lastfm = new LastFM(myKey, { userAgent: 'Record Bin' });

class RecordSlider extends React.Component {
  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    records: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      recordsData: [],
    };
  }

  componentDidMount() {
    this.initRecords();
  }

  initRecords = () => {
    const { records } = this.props;
    const recordsData = [];

    const recordsArray = Object.values(records);

    recordsArray.forEach((item) => {
      lastfm.albumInfo({ name: item.record, artistName: item.artist }, (err, data) => {
        if (err) console.error(err);
        else {
          recordsData.push(data);
          this.setState({ recordsData });
        }
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { recordsData } = this.state;

    console.log('Records Data: ', recordsData);

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
          { recordsData.map(record => (
            <Grid item xs key={ record.name }>
              <ButtonBase>
                <Link to={ `liner-notes/${record.artistName}/${record.name}` }>
                  <Album image={ record.images[4] } />
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

export default withStyles(styles)(RecordSlider);

// General Imports:
import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LastFM from 'last-fm';

// Material UI components:
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
// import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const recordInfo = {
  album:  'Coloring Book',
  artist: 'Chance The Rapper',
  tracks: ['All We Got', 'No Problem', 'Summer Friends', 'D.R.A.M. Sings Special', 'Blessings', 'Same Drugs', 'Mixtape', 'Angels', 'Juke Jam', 'All Night', 'How Great', 'Smoke Break', 'Finish Line / Drown', 'Blessings (Reprise)'],
  notes:  ['In another world, you can imagine Chance the Rapper lip-syncing “Twist and Shout” at Chicago’s Von Steuben Day parade, surrounded by frauleins doing the money dance. You can visualize a rap game Ferris Bueller: arms outstretched to snare a foul ball, staring stoned at Seurat, ducking fascist educators, and oblivious parents with cinematic ease. You can hear his impression of Abe Froman, sausage king of Chicago, and it’s pitch-perfect.',
    "Barely out of his teens, Chancelor Bennett has already transformed himself from a suspended high school student to the young Chicago rapper universally adored among 'sportos, motorheads, geeks, sluts, bloods, wasteoids, dweebies, and dickheads.' The release of last week’s Acid Rap triggered such intense demand that it crashed both hosting site Audiomack and Windy City rap agora Fake Shore Drive. Cops recently banned Chance from two separate high school parking lots after mobs formed once kids discovered he was on campus.",
    'But life rarely parallels a John Hughes script. Unlike Bueller, Chance actually got caught skipping school, a 10-day sabbatical that inspired his first mixtape, last year’s #10Day. His neighborhood of West Chatham might not be the worst in a city whose alias is Chiraq, but it’s still South Side and far removed from baronial Highland Park. The drugs are high-velocity, the slang is crisper, and in this scenario, Cameron dies.',
  ],
  comments: ['This album is so good!', 'Chance is the best.'],
};

const user = {
  username:  'ejmudrak',
  firstname: 'Erik',
  lastname:  'Mudrak',
};


const lastfm = new LastFM('da0881e1793be56a2618b937f536389c', { userAgent: 'Record Bin' });

class LinerNotes extends React.Component {
  static propTypes = {
    match:   PropTypes.instanceOf(Object).isRequired,
    classes: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    this.getTracks();
  }

  getTracks = () => {
    const { match: { params: { artist, record } } } = this.props;

    lastfm.albumInfo({ name: record, artistName: artist }, (err, data) => {
      this.setState({ tracks: data.tracks });
    });
  }

  render() {
    const { classes, match: { params: { artist, record } } } = this.props;
    const { tracks } = this.state;

    console.log('Album Data: ', tracks);

    return (
      <div>
        <Grid container>
          <Paper className={ classes.container }>
            <Grid container className={ classes.innerContainer }>
              <Grid item xs={ 4 } className={ classes.trackListContainer } >
                <h1 className={ classes.linerTitle }>{ record }</h1>
                <p className={ classes.linerSubtitle }>{ artist }</p>
                <Divider />
                <List className={ classes.trackList }>
                  { tracks.map((track, index) => (
                    <ListItem button key={ track.name }>
                      <Avatar style={ { backgroundColor: '#5c24f5' } }>
                        { index + 1 }
                      </Avatar>
                      <ListItemText primary={ track.name } />
                      <ListItemSecondaryAction>
                        <IconButton aria-label='Play'>
                          <Icon>music_note</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                  }
                </List>
              </Grid>

              <Grid item xs={ 8 } className={ classes.notesContainer } >
                <h1 className={ classes.linerTitle }>Liner Notes</h1>
                <Link to='/'>
                  <IconButton className={ classes.closeButton }>
                    <Icon>close</Icon>
                  </IconButton>
                </Link>
                <p className={ classes.linerSubtitle }>{ user.firstname } { user.lastname }</p>
                <Divider />
                <p className={ classes.notes }>
                  <span className={ classes.quotes }>
                    &quot;
                    &nbsp;
                  </span>
                  { recordInfo.notes[0] }
                </p>
                <p className={ classes.notes }>{ recordInfo.notes[1] }</p>
                <p className={ classes.notes }>{ recordInfo.notes[2] }
                  <span className={ classes.quotes }>
                    &nbsp;
                    &quot;
                  </span>
                </p>
                <Divider />

              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    backgroundColor: '#fff',
    height:          '85vh',
    width:           '90vw',
    display:         'block',
    margin:          'auto',
    marginTop:       40,
  },
  innerContainer: {
    height: '100%',
  },
  trackListContainer: {
    height:      '100%',
    width:       '100%',
    borderRight: '1px solid gray',
  },
  notesContainer: {
    height: '100%',
  },
  trackList: {
    maxHeight: '675px',
    overflow:  'auto',
    position:  'relative',
  },
  linerTitle: {
    marginLeft: '25px',
    color:      '#5c24f5',
    width:      '75%',
  },
  closeButton: {
    float:     'right',
    marginTop: '-80px',
  },
  linerSubtitle: {
    marginLeft: '25px',
    color:      'gray',
  },
  notes: {
    margin:     '25px',
    lineHeight: '25px',
    fontWeight: '400',
  },
  quotes: {
    color:      '#5c24f5',
    fontSize:   '28px',
    fontWeight: 'bold',
  },
});

export default withStyles(styles)(LinerNotes);

/* page.js -- home
Author: Erik Mudrak - Spring 2017 - Senior Seminar project
Description: Implements home page of web app
*/

// General Imports:
import React from 'react';

// Style and images:
import './style.css';
import Chance from './chance.png';
import Kanye from './kanye.jpg';
import Paak from './paak.png';
import Frank from './frank.jpg';
import GlassAnimals from './glass_animals.jpg';

// Material UI imports
// import Dialog from 'material-ui/Dialog';

const records = [
  {
    "album": "Coloring Book",
    "artist": "Chance The Rapper",
    "tracks": [ "One","Two","Three","Four"],
    "notes": "This album is so happy!"
  },
  {
    "album": "Late Registration",
    "artist": "Kanye West",
    "tracks": [ "One","Two","Three","Four"],
    "notes": "This album is very good!"
  },

];


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
*/


export default class Bin extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div className='binContainer' >
          <div className='binFront'></div>
          <div className='binBack'>
            <div className='records'>
                <Album className='album' image={Chance} />
                <Album className='album'image={Kanye} />
                <img alt="album" className='album' src={Paak} />
                <img alt="album" className='album' src={Frank} />
                <img alt="album" className='album' src={GlassAnimals} />
            </div>
        </div>
        {/* <LinerNotes className={styles.currentAlbumContainer} openAlbum={this.openAlbum}/> */}
      </div>
    );
  }
}

const Album = (props) => {

  const { image } = props;
  return (
    <div>
      <img alt="album" className='album' src={image} />
    </div>
  );
}

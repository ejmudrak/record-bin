import { HOME_PAGE_BUTTON_PRESSED } from '../types/exampleActionTypes';

export const homePageButtonPressed = () => ({
  type:    HOME_PAGE_BUTTON_PRESSED,
  payload: { isExampleAction: true },
});

export const RECEIVE_RECORD = 'RECEIVE_RECORD';

function receiveRecord(json) {
  return {
    type:       RECEIVE_RECORD,
    posts:      json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function getRecordInfo(record, artist, type) {
  const baseURL = 'https://ws.audioscrobbler.com/2.0/';
  const method = 'album.getInfo';
  const apiKey = '57ee3318536b23ee81d6b27e36997cde';
  // switch (type) {
  //   case 'album':
  //     break;
  //   case 'song':
  //     break;
  //   default:
  //     break;
  // }
  return (dispatch) => {
    const albumUrl = `${baseURL}?method=${method}&artist=${artist}&album=${record}&api_key=${apiKey}&format=json`;

    return fetch(albumUrl)
      .then(response => response.json())
      .then(json => dispatch(receiveRecord(json)));
  };
}

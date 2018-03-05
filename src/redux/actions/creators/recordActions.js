import { RECEIVE_RECORDS, REQUEST_RECORDS } from '../types/recordActionTypes';


function receiveRecord(json) {
  return {
    type:        RECEIVE_RECORDS,
    recordsData: json,
    receivedAt:  Date.now(),
  };
}

function requestRecord() {
  return {
    type: REQUEST_RECORDS,
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchRecord(binID, 'Kanye West', 'Graduation'))

export function fetchRecord(artist, record) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  const baseURL = 'https://ws.audioscrobbler.com/2.0/';
  const method = 'album.getInfo';
  const apiKey = '57ee3318536b23ee81d6b27e36997cde';
  const url = `${baseURL}?method=${method}&artist=${artist}&album=${record}&api_key=${apiKey}&format=json`;

  return (dispatch) => {
    dispatch(requestRecord());
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveRecord(json)));
  };
}

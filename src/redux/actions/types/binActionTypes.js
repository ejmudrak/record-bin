export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
function receiveRecord(bin, json) {
  return {
    type:       RECEIVE_RECORDS,
    bin,
    recordData: json,
    receivedAt: Date.now(),
  };
}

export const REQUEST_RECORDS = 'REQUEST_RECORDS';
function requestRecord(record) {
  return {
    type: REQUEST_RECORDS,
    record,
  };
}

export function getRecordInfo(record, artist) {
  const baseURL = 'https://ws.audioscrobbler.com/2.0/';
  const method = 'album.getInfo';
  const apiKey = '57ee3318536b23ee81d6b27e36997cde';
  return (dispatch) => {
    const albumUrl = `${baseURL}?method=${method}&artist=${artist}&album=${record}&api_key=${apiKey}&format=json`;
    dispatch(requestRecord(record));
    return fetch(albumUrl)
      .then(response => response.json())
      .then(json => dispatch(receiveRecord(record, json)));
  };
}

import {
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
} from '../actions/types/recordActionTypes';

function records(
  state = {
    isFetching:    false,
    didInvalidate: false,
    record:        '',
  },
  action
) {
  switch (action.type) {
    case REQUEST_RECORDS:
      return Object.assign({}, state, {
        isFetching:    true,
        didInvalidate: false,
      });
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
        isFetching:    false,
        didInvalidate: false,
        record:        action.recordsData,
        lastUpdated:   action.receivedAt,
      });
    default:
      return state;
  }
}

export default function recordsByBin(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RECORDS:
    case REQUEST_RECORDS:
      return Object.assign({}, state, {
        [action.bin]: records(state[action.bin], action),
      });
    default:
      return state;
  }
}

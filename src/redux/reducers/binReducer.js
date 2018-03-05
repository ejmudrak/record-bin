import { combineReducers } from 'redux';

import {
  SELECT_BIN,
  INVALIDATE_BIN,
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
} from '../actions/types/binActionTypes';


function selectedBin(state = 'Currents', action) {
  switch (action.type) {
    case SELECT_BIN:
      return action.bin;
    default:
      return state;
  }
}

function records(
  state = {
    isFetching:    false,
    didInvalidate: false,
    items:         [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_BIN:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_RECORDS:
      return Object.assign({}, state, {
        isFetching:    true,
        didInvalidate: false,
      });
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
        isFetching:    false,
        didInvalidate: false,
        items:         action.records,
        lastUpdated:   action.receivedAt,
      });
    default:
      return state;
  }
}

function recordsByBin(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_BIN:
    case RECEIVE_RECORDS:
    case REQUEST_RECORDS:
      return Object.assign({}, state, {
        [action.bin]: records(state[action.bin], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recordsByBin,
  selectedBin,
});

export default rootReducer;

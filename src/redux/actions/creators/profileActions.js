import * as firebase from 'firebase';
import { ADD_PROFILE_RECORD } from '../types/profileActionTypes';

export const addRecordToProfile = (userRecords, bin, artist, record, type, uid) => {
  const profileRef = firebase.database().ref(`/userProfile/${uid}/bins/${bin}`);
  const records = [...userRecords, { artist, record, type }];
  return {
    type:    ADD_PROFILE_RECORD,
    payload: profileRef.update({ records }),
  };
};

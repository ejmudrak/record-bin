import * as firebase from 'firebase';
import { initialize } from 'redux-form';
import { HOME_PAGE_BUTTON_PRESSED, GET_RECORDS } from '../types/exampleActionTypes';

export const homePageButtonPressed = () => ({
  type: HOME_PAGE_BUTTON_PRESSED,
  payload: { isExampleAction: true }
});

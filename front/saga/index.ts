import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import shopSaga from './shop';
import orderSaga from './order';

import { backUrl } from '../exporthing/config';

axios.defaults.baseURL = `${backUrl}`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(shopSaga),
    fork(orderSaga),
  ]);
}

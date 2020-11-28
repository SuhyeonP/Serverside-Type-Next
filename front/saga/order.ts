import { all, fork, takeLatest, put, throttle, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  ORDER_USER_REQUEST,
  ORDER_USER_SUCCESS,
  ORDER_USER_FAILURE,
} from '../reducers/user';

function userPostOrderAPI(data) {
  return axios.post('/order', data);
}

function* userPostOrder(action) {
  try {
    const result = yield call(userPostOrderAPI, action.data);
    yield put({
      type: ORDER_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ORDER_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUserOrder() {
  yield takeEvery(ORDER_USER_REQUEST, userPostOrder);
}
export default function* postSaga() {
  yield all([
    fork(watchUserOrder),
  ]);
}

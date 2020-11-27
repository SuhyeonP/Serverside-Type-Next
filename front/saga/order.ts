import {all, fork, takeLatest, put, throttle, call, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
} from '../reducers/shop';

import {
  ORDER_USER_REQUEST,
  ORDER_USER_SUCCESS,
  ORDER_USER_FAILURE,
} from '../reducers/user';

function shopGetOrderAPI(shopId) {
  return axios.get(`/${shopId}`);
}

function* shopGetOrder(action) {
  try {
    const result = yield call(shopGetOrderAPI, action.shopId);
    yield put({
      type: GET_ORDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchShopGetOrder() {
  yield takeLatest(GET_ORDER_REQUEST, shopGetOrder);
}

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
    fork(watchShopGetOrder),
  ]);
}

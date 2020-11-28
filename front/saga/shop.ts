import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_MAIN_SHOPS_REQUEST,
  LOAD_MAIN_SHOPS_SUCCESS,
  LOAD_MAIN_SHOPS_FAILURE,
  LOAD_SHOP_REQUEST,
  LOAD_SHOP_SUCCESS,
  LOAD_SHOP_FAILURE,
} from '../reducers/shop';

function loadShopsAPI(lastId) {
  return axios.get(`/shops?lastId=${lastId || 0}`);
}

function* loadShops(action) {
  try {
    const result = yield call(loadShopsAPI, action.lastId);
    yield put({
      type: LOAD_MAIN_SHOPS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MAIN_SHOPS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadShops() {
  yield throttle(2000, LOAD_MAIN_SHOPS_REQUEST, loadShops);
}

function loadShopAPI(shopId, lastId) {
  return axios.get(`/shop/${shopId}/menus?lastId=${lastId || 0}`);
}

function* loadShop(action) {
  try {
    const result = yield call(loadShopAPI, action.data.shopId, action.data.lastId);
    yield put({
      type: LOAD_SHOP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SHOP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadShop() {
  yield takeLatest(LOAD_SHOP_REQUEST, loadShop);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadShops),
    fork(watchLoadShop),
  ]);
}

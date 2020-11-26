import produce from 'immer';

export const initialState = {
  mainShops: [], // 화면에 보일 가게
  isAddingComment: false,
  addCommentErrorReason: '',
  commentAdded: false,
  single1Shop: null,
  hasMoreShop: false,
  loadingGetShop:false,
  loadingGetError:'',
};
export type IShopReducerState = typeof initialState;

export const LOAD_MAIN_SHOPS_REQUEST = 'LOAD_MAIN_SHOPS_REQUEST';
export const LOAD_MAIN_SHOPS_SUCCESS = 'LOAD_MAIN_SHOPS_SUCCESS';
export const LOAD_MAIN_SHOPS_FAILURE = 'LOAD_MAIN_SHOPS_FAILURE';

export const LOAD_SHOP_REQUEST = 'LOAD_SHOP_REQUEST';
export const LOAD_SHOP_SUCCESS = 'LOAD_SHOP_SUCCESS';
export const LOAD_SHOP_FAILURE = 'LOAD_SHOP_FAILURE';

export const MAKE_DUMMY_SHOP_REQUEST = 'MAKE_DUMMY_SHOP_REQUEST';
export const MAKE_DUMMY_SHOP_SUCCESS = 'MAKE_DUMMY_SHOP_SUCCESS';
export const MAKE_DUMMY_SHOP_FAILURE = 'MAKE_DUMMY_SHOP_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MAIN_SHOPS_REQUEST: {
      draft.mainShops = !action.lastId ? [] : draft.mainShops;
      draft.hasMoreShop = action.lastId ? draft.hasMoreShop : true;
      break;
    }
    case LOAD_MAIN_SHOPS_SUCCESS: {
      action.data.forEach((d) => {
        draft.mainShops.push(d);
      });
      draft.hasMoreShop = action.data.length === 4;
      break;
    }
    case LOAD_SHOP_REQUEST: {
      draft.loadingGetShop = true;
      draft.loadingGetError = null;
      break;
    }
    case LOAD_SHOP_SUCCESS: {
      draft.loadingGetShop = false;
      draft.single1Shop = action.data;
      break;
    }
    case LOAD_SHOP_FAILURE:
    case LOAD_MAIN_SHOPS_FAILURE: {
      draft.loadingGetShop=false;
      draft.loadingGetError=action.error;
      break;
    }
    default: {
      break;
    }
  }
});

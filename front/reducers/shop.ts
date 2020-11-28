import produce from 'immer';

export const initialState = {
  mainShops: [], // 화면에 보일 가게
  isAddingComment: false,
  addCommentErrorReason: '',
  commentAdded: false,
  single1Shop: null,
  hasMoreShop: false,
  hasMoreMenu: false,
  loadingGetShop: false,
  loadingGetError: '',
  menus: [],
  menuPart: [],
};
export type IShopReducerState = typeof initialState;

export const LOAD_MAIN_SHOPS_REQUEST = 'LOAD_MAIN_SHOPS_REQUEST';
export const LOAD_MAIN_SHOPS_SUCCESS = 'LOAD_MAIN_SHOPS_SUCCESS';
export const LOAD_MAIN_SHOPS_FAILURE = 'LOAD_MAIN_SHOPS_FAILURE';

export const LOAD_SHOP_REQUEST = 'LOAD_SHOP_REQUEST';
export const LOAD_SHOP_SUCCESS = 'LOAD_SHOP_SUCCESS';
export const LOAD_SHOP_FAILURE = 'LOAD_SHOP_FAILURE';

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
      draft.hasMoreShop = action.data.length === 6;
      break;
    }
    case LOAD_SHOP_REQUEST: {
      draft.menus = !action.data.lastId ? [] : draft.menus;
      draft.loadingGetShop = true;
      draft.loadingGetError = null;
      break;
    }
    case LOAD_SHOP_SUCCESS: {
      draft.loadingGetShop = false;
      draft.single1Shop = action.data.shop;
      action.data.shop.Menus.forEach((d) => {
        draft.menus.push(d);
      });
      draft.menuPart = action.data.part;
      draft.hasMoreMenu = action.data.length === 3;
      break;
    }
    case LOAD_SHOP_FAILURE:
    case LOAD_MAIN_SHOPS_FAILURE: {
      draft.loadingGetShop = false;
      draft.loadingGetError = action.error;
      break;
    }
    default: {
      break;
    }
  }
});

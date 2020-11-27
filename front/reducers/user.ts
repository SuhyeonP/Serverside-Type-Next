import produce from 'immer';

// interface user{
//   isLoggingOut: boolean,
//   isLoggingIn: boolean,
//   loginError: string|null,
//   isSignedUp: boolean,
//   isSigningUp: boolean,
//   signUpError: string|null,
//   me: null|any,
//   shopIsMe: null|any,
//   myOrder: any[],
//   ordering: boolean,
//   ordered: boolean,
//   orderError: string|null,
// }

export const initialState = {
  isLoggingOut: false,
  isLoggingIn: false,
  loginError: '',
  isSignedUp: false,
  isSigningUp: false,
  signUpError: '',
  me: null,
  shopIsMe: null,
  myOrder: [],
  ordering: false,
  ordered: false,
  orderError: '',
  testData: null,
};
export type IUserReducerState = typeof initialState;

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const SIGN_UP_SHOP_REQUEST = 'SIGN_UP_SHOP_REQUEST';
export const SIGN_UP_SHOP_SUCCESS = 'SIGN_UP_SHOP_SUCCESS';
export const SIGN_UP_SHOP_FAILURE = 'SIGN_UP_SHOP_FAILURE';

export const LOG_IN_SHOP_REQUEST = 'LOG_IN_SHOP_REQUEST';
export const LOG_IN_SHOP_SUCCESS = 'LOG_IN_SHOP_SUCCESS';
export const LOG_IN_SHOP_FAILURE = 'LOG_IN_SHOP_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const ORDER_USER_REQUEST = 'ORDER_USER_REQUEST';
export const ORDER_USER_SUCCESS = 'ORDER_USER_SUCCESS';
export const ORDER_USER_FAILURE = 'ORDER_USER_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_SHOP_REQUEST:
    case LOG_IN_REQUEST: {
      draft.isLoggingIn = true;
      draft.loginError = '';
      break;
    }
    case LOG_IN_SHOP_SUCCESS: {
      draft.isLoggingIn = false;
      draft.loginError = '';
      draft.shopIsMe = action.data.shopIsMe;
      draft.me = action.data.me;
      break;
    }
    case LOG_IN_SUCCESS: {
      draft.isLoggingIn = false;
      draft.loginError = '';
      draft.me = action.data;
      break;
    }
    case LOG_IN_SHOP_FAILURE:
    case LOG_IN_FAILURE: {
      draft.isLoggingIn = false;
      draft.loginError = action.reason;
      draft.me = null;
      break;
    }
    case LOG_OUT_REQUEST: {
      draft.isLoggingOut = true;
      break;
    }
    case LOG_OUT_SUCCESS: {
      draft.isLoggingOut = false;
      draft.me = null;
      break;
    }
    case SIGN_UP_SHOP_REQUEST:
    case SIGN_UP_REQUEST: {
      draft.isSignedUp = false;
      draft.isSigningUp = true;
      draft.signUpError = '';
      break;
    }
    case SIGN_UP_SUCCESS: {
      draft.isSigningUp = false;
      draft.isSignedUp = true;
      break;
    }
    case SIGN_UP_SHOP_FAILURE:
    case SIGN_UP_FAILURE: {
      draft.isSigningUp = false;
      draft.signUpError = action.error;
      break;
    }
    case SIGN_UP_SHOP_SUCCESS: {
      draft.isSigningUp = false;
      draft.isSignedUp = true;
      break;
    }
    case LOAD_USER_REQUEST: {
      break;
    }
    case LOAD_USER_SUCCESS: {
      if (action.data.shopIsMe) {
        draft.shopIsMe = action.data.shopIsMe;
        draft.me = action.data.me;
      } else {
        draft.me = action.data.me;
      }
      break;
    }
    case LOAD_USER_FAILURE: {
      break;
    }
    case ORDER_USER_REQUEST: {
      draft.ordering = true;
      draft.ordered = false;
      draft.orderError = null;
      break;
    }
    case ORDER_USER_SUCCESS: {
      draft.ordering = false;
      draft.ordered = true;
      draft.testData = action.data;
      break;
    }
    case ORDER_USER_FAILURE: {
      draft.ordering = false;
      draft.orderError = action.error;
      break;
    }
    default: {
      break;
    }
  }
});

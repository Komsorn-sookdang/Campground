import * as TYPE from "./type";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.LOGIN_REQ:
      return {
        ...state,
        loading: true,
      };
    case TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case TYPE.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TYPE.LOGOUT_REQ:
      return {
        ...state,
        loading: true,
      };
    case TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case TYPE.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

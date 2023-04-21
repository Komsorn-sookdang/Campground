import * as TYPE from "./type";
import { login, signOut } from "./api";

export const loginReq = (value) => async (dispatch) => {
  dispatch({ type: TYPE.LOGIN_REQ });

  try {
    const res = await login(value.email, value.password);
    dispatch({ type: TYPE.LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPE.LOGIN_FAIL, payload: error });
  }
};

export const logoutReq = () => async (dispatch) => {
  dispatch({ type: TYPE.LOGOUT_REQ });

  try {
    const res = await signOut();
    dispatch({ type: TYPE.LOGOUT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPE.LOGOUT_FAIL, payload: error });
  }
};

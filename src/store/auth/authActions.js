import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SET_PROFILE,
  REMOVE_PROFILE,
  REMEMBER_PROFILE,
  REGISTER_EMAIL
} from "./authActionTypes";

export const LoginSuccess = () => {
  return {
    type: AUTH_SUCCESS,
  };
};

export const searchUserSuccess = (payload) => ({
  type: "SEARCH_USER_SUCCESS",
  payload,
});

export const rememberUser = (payload) => ({
  type: REMEMBER_PROFILE,
  payload,
});

export const LoginFail = () => {
  return {
    type: AUTH_FAILURE,
  };
};

export const setProfile = (data) => {
  return {
    type: SET_PROFILE,
    payload: data,
  };
};

export const registerEmail = (data) => {
  return {
    type: REGISTER_EMAIL,
    payload: data,
  };
};

export const removeProfile = () => {
  return {
    type: REMOVE_PROFILE,
  };
};

export const Logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("saved");
  dispatch(LoginFail());
  dispatch(removeProfile());
}
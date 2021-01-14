import {
  AUTH_LOGIN,
  AUTH_FORGOT_PASS,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_CLEAR_ALL_STATE,
} from '../constant';

export function authLogin(payload) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function authForgotPassword(payload, callback) {
  return {
    type: AUTH_FORGOT_PASS,
    payload,
    callback: callback,
  };
}

export function authRegister(payload, callback) {
  return {
    type: AUTH_REGISTER,
    payload,
    callback: callback,
  };
}

export function authClearAllState() {
  return {
    type: AUTH_CLEAR_ALL_STATE,
  };
}

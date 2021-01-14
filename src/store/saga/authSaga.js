import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api/auth';
import * as RootNavigation from '../../navigation/RootNavigation';

import { Messaging } from '../../common';

import {
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_ERROR,
  AUTH_SET_TOKEN,
  KEY_STORAGE_TOKEN,
  AUTH_FORGOT_PASS,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  KEY_STORAGE_ENTITY,
  KEY_STORAGE_LOCATION,
  ACTIVITY_TYPE_SET_LIST,
  USER_SET_ME,
  ENTITY_SET_LIST,
  AUTH_CLEAR_ALL_STATE,
  ACTIVITY_SET_LIST,
  USER_SET_LOCATION,
  USER_SET_LOCATION_LIST,
  USER_SET_ENTITY,
  USER_SET_SUBSCRIPTION,
  ENTITY_SET_MEMBER,
  EVENT_SET_LIST,
  LOCATION_SET_LIST,
  USER_SET_SUBSCRIPTION_STATUS,
  USER_SET_LIST,
  ACTIVITY_SET_RECENT_LIST,
} from '../constant';

function* authEffectSaga(action) {
  yield put({ type: AUTH_LOADING, loading: true });
  try {
    switch (action.type) {
      case AUTH_LOGIN:
        {
          let { data } = yield call(api.singin, action.payload);
          // let isSuccess = data.success;
          if (data.success) {
            yield AsyncStorage.setItem(KEY_STORAGE_TOKEN, data.data);
            yield put({
              type: AUTH_SET_TOKEN,
              payload: {
                token: data.data,
                message: '',
                username: action.payload.username,
              },
            });
            RootNavigation.replace('MainTab');
          } else {
            Messaging.showMessage({
              message: data.message,
              type: Messaging.types.DANGER,
            });
          }
          yield put({ type: AUTH_LOADING, loading: false });
        }
        break;
      case AUTH_LOGOUT:
        {
          let { data } = yield call(api.singOut);
          if (data.success) {
            RootNavigation.replace('Login');
            yield AsyncStorage.multiRemove([
              KEY_STORAGE_TOKEN,
              KEY_STORAGE_ENTITY,
              KEY_STORAGE_LOCATION,
            ]);
          } else {
            Messaging.showMessage({
              message: 'Logout error',
              type: Messaging.types.DANGER,
            });
          }
          yield put({ type: AUTH_LOADING, loading: false });
        }
        break;
      case AUTH_FORGOT_PASS:
        {
          let { data } = yield call(api.forgotPass, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({ type: AUTH_LOADING, loading: false });
        }
        break;
      case AUTH_REGISTER:
        {
          let { data } = yield call(api.register, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({ type: AUTH_LOADING, loading: false });
        }
        break;
      case AUTH_CLEAR_ALL_STATE:
        {
          yield put({
            type: AUTH_SET_TOKEN,
            payload: {
              token: '',
              message: '',
              username: '',
            },
          });

          // Activity Type
          yield put({
            type: ACTIVITY_TYPE_SET_LIST,
            payload: {
              data: [],
              reset: true,
            },
          });

          //#region User
          yield put({
            type: USER_SET_ME,
            payload: {},
          });
          yield put({
            type: USER_SET_LIST,
            payload: {
              data: [],
              reset: true,
            },
          });
          yield put({
            type: USER_SET_LOCATION,
            payload: '',
          });
          yield put({
            type: USER_SET_LOCATION_LIST,
            payload: [],
          });
          yield put({
            type: USER_SET_ENTITY,
            payload: null,
          });
          yield put({
            type: USER_SET_SUBSCRIPTION,
            payload: null,
          });
          yield put({
            type: USER_SET_SUBSCRIPTION_STATUS,
            payload: '',
          });
          //#endregion

          //#region Entity
          yield put({
            type: ENTITY_SET_LIST,
            payload: {
              data: [],
              reset: true,
            },
          });
          yield put({
            type: ENTITY_SET_MEMBER,
            payload: {
              data: [],
              reset: true,
            },
          });
          //#endregion

          //#region Activity
          yield put({
            type: ACTIVITY_SET_LIST,
            payload: {
              data: [],
              reset: true,
            },
          });
          yield put({
            type: ACTIVITY_SET_RECENT_LIST,
            payload: {
              data: [],
            },
          });
          //#endregion

          // Event
          yield put({
            type: EVENT_SET_LIST,
            payload: {
              data: [],
              reset: true,
            },
          });

          // Location
          yield put({
            type: LOCATION_SET_LIST,
            payload: {
              data: [],
            },
          });
        }
        break;
      default:
        break;
    }
  } catch (e) {
    yield put({ type: AUTH_ERROR, message: 'Error on calling auth api' });
    yield put({ type: AUTH_LOADING, loading: false });
  }
}

export function* authWatcherSaga() {
  yield takeLatest(AUTH_LOGIN, authEffectSaga);
  yield takeLatest(AUTH_FORGOT_PASS, authEffectSaga);
  yield takeLatest(AUTH_REGISTER, authEffectSaga);
  yield takeLatest(AUTH_LOGOUT, authEffectSaga);
  yield takeLatest(AUTH_CLEAR_ALL_STATE, authEffectSaga);
}

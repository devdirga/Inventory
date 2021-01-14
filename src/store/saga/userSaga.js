import {takeLatest, call, put} from 'redux-saga/effects';
import api from '../api/user';

import {Messaging} from '../../common';

import {
  USER_GET_ME,
  USER_SET_ME,
  USER_CHANGE_PASSWORD,
  USER_CHANGE_PROFILE,
  USER_GET_LOCATION_LIST,
  USER_SET_LOCATION_LIST,
  USER_LOADING,
  USER_GET,
  USER_SET_LIST,
  USER_GET_SUBSCRIPTION,
  USER_SET_SUBSCRIPTION,
} from '../constant';

function* userEffectSaga(action) {
  yield put({type: USER_LOADING, loading: true});
  try {
    switch (action.type) {
      case USER_GET:
        {
          let {data} = yield call(api.get, action.payload);
          if (data.success) {
            yield put({
              type: USER_SET_LIST,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: USER_SET_LIST,
              payload: {
                data: [],
                reset: true,
              },
            });
            Messaging.showMessage({
              message: data.message,
              type: Messaging.types.DANGER,
            });
          }
          if (action.callback) {
            action.callback(data);
          }
          yield put({type: USER_LOADING, loading: false});
        }
        break;
      case USER_GET_ME:
        {
          let {data} = yield call(api.getMe);
          if (data.success) {
            yield put({
              type: USER_SET_ME,
              payload: data.data,
            });
          } else {
            Messaging.showMessage({
              message: data.message,
              type: Messaging.types.DANGER,
            });
          }
          if (action.callback) {
            action.callback(data);
          }
          yield put({type: USER_LOADING, loading: false});
        }
        break;
      case USER_CHANGE_PASSWORD:
        {
          let {data} = yield call(api.changePassword, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({type: USER_LOADING, loading: false});
        }
        break;
      case USER_CHANGE_PROFILE:
        {
          let {data} = yield call(api.changeProfile, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({type: USER_LOADING, loading: false});
        }
        break;
      case USER_GET_LOCATION_LIST:
        {
          let {
            data: {success, data},
          } = yield call(api.getLocationList, action.payload);
          if (success)
            yield put({
              type: USER_SET_LOCATION_LIST,
              payload: data,
            });
          yield put({type: USER_LOADING, loading: false});
        }
        break;
      case USER_GET_SUBSCRIPTION:
        {
          let {data} = yield call(api.getSubscription, action.payload);
          if (data.success) {
            yield put({
              type: USER_SET_SUBSCRIPTION,
              payload: data.data,
            });
          }
          if (action.callback) {
            action.callback(data);
          }
          yield put({type: USER_LOADING, loading: false});
        }
        break;
      default:
        break;
    }
  } catch (e) {
    Messaging.showMessage({
      message: 'Error on calling user api',
      type: Messaging.types.DANGER,
    });
    yield put({type: USER_LOADING, loading: false});
  }
}

export function* userWatcherSaga() {
  yield takeLatest(USER_GET, userEffectSaga);
  yield takeLatest(USER_GET_ME, userEffectSaga);
  yield takeLatest(USER_CHANGE_PASSWORD, userEffectSaga);
  yield takeLatest(USER_CHANGE_PROFILE, userEffectSaga);
  yield takeLatest(USER_GET_LOCATION_LIST, userEffectSaga);
  yield takeLatest(USER_GET_SUBSCRIPTION, userEffectSaga);
}

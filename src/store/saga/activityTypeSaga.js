import {takeLatest, call, put} from 'redux-saga/effects';
import api from '../api/activityType';

import {Messaging} from '../../common';
import {
  ACTIVITY_TYPE_GET,
  ACTIVITY_TYPE_SET_LIST,
  ACTIVITY_TYPE_LOADING,
} from '../constant';

function* activityTypeEffectSaga(action) {
  yield put({type: ACTIVITY_TYPE_LOADING, loading: true});
  try {
    switch (action.type) {
      case ACTIVITY_TYPE_GET:
        {
          let {data} = yield call(api.get, action.payload);
          if (data.success) {
            yield put({
              type: ACTIVITY_TYPE_SET_LIST,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: ACTIVITY_TYPE_SET_LIST,
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
          yield put({type: ACTIVITY_TYPE_LOADING, loading: false});
        }
        break;
      default:
        break;
    }
  } catch (e) {
    Messaging.showMessage({
      message: 'Error on calling activity type api',
      type: Messaging.types.DANGER,
    });
    yield put({type: ACTIVITY_TYPE_LOADING, loading: false});
  }
}

export function* activityTypeWatcherSaga() {
  yield takeLatest(ACTIVITY_TYPE_GET, activityTypeEffectSaga);
}

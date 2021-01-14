import {takeLatest, call, put} from 'redux-saga/effects';
import api from '../api/activity';

import {Messaging} from '../../common';
import {
  ACTIVITY_GET,
  ACTIVITY_GET_RECENT,
  ACTIVITY_SET_LIST,
  ACTIVITY_SET_RECENT_LIST,
  ACTIVITY_LOADING,
} from '../constant';
import moment from 'moment';

function* activityEffectSaga(action) {
  if (!action.ignoreLoading) {
    yield put({type: ACTIVITY_LOADING, loading: true});
  }
  try {
    switch (action.type) {
      case ACTIVITY_GET:
        {
          let {data} = yield call(api.get, action.payload);
          if (data.success) {
            yield put({
              type: ACTIVITY_SET_LIST,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: ACTIVITY_SET_LIST,
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
          yield put({type: ACTIVITY_LOADING, loading: false});
        }
        break;
      case ACTIVITY_GET_RECENT:
        {
          let {data} = yield call(api.get, {
            entityID: action.payload.entityID,
            userID: action.payload.userID,
            limit: 10,
            skip: 0,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
          });
          if (data.success) {
            yield put({
              type: ACTIVITY_SET_RECENT_LIST,
              payload: {
                data: data.data,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: ACTIVITY_SET_RECENT_LIST,
              payload: {
                data: [],
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
          yield put({type: ACTIVITY_LOADING, loading: false});
        }
        break;
      default:
        break;
    }
  } catch (e) {
    Messaging.showMessage({
      message: 'Error on calling activity api',
      type: Messaging.types.DANGER,
    });
    yield put({type: ACTIVITY_LOADING, loading: false});
  }
}

export function* activityWatcherSaga() {
  yield takeLatest(ACTIVITY_GET, activityEffectSaga);
  yield takeLatest(ACTIVITY_GET_RECENT, activityEffectSaga);
}

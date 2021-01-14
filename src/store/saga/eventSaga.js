import {takeLatest, call, put} from 'redux-saga/effects';
import api from '../api/event';

import {Messaging} from '../../common';
import {
  EVENT_LOADING,
  EVENT_GET,
  EVENT_SET_LIST,
  EVENT_INSERT_DATA,
  EVENT_GET_BY_ID,
  EVENT_UPDATE_DATA,
  EVENT_SCAN,
} from '../constant';

function* eventEffectSaga(action) {
  if (!action.ignoreLoading) {
    yield put({type: EVENT_LOADING, loading: true});
  }
  try {
    switch (action.type) {
      case EVENT_GET:
        {
          let {data} = yield call(api.get, action.payload);
          if (data.success) {
            yield put({
              type: EVENT_SET_LIST,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: EVENT_SET_LIST,
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
          yield put({type: EVENT_LOADING, loading: false});
        }
        break;
      case EVENT_INSERT_DATA:
        {
          let {data} = yield call(api.insertEvent, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({type: EVENT_LOADING, loading: false});
        }
        break;
      case EVENT_UPDATE_DATA:
        {
          let {data} = yield call(api.updateEvent, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({type: EVENT_LOADING, loading: false});
        }
        break;
      case EVENT_GET_BY_ID:
        {
          let {data} = yield call(api.getByID, {id: action.payload});

          if (action.callback) {
            action.callback(data);
          }
          yield put({type: EVENT_LOADING, loading: false});
        }
        break;
      case EVENT_SCAN:
        {
          let {data} = yield call(api.scan, action.payload);

          if (action.callback) {
            action.callback(data);
          }
          yield put({type: EVENT_LOADING, loading: false});
        }
        break;
      default:
        break;
    }
  } catch (e) {
    Messaging.showMessage({
      message: 'Error on calling event api',
      type: Messaging.types.DANGER,
    });
    yield put({type: EVENT_LOADING, loading: false});
  }
}

export function* eventWatcherSaga() {
  yield takeLatest(EVENT_GET, eventEffectSaga);
  yield takeLatest(EVENT_INSERT_DATA, eventEffectSaga);
  yield takeLatest(EVENT_UPDATE_DATA, eventEffectSaga);
  yield takeLatest(EVENT_GET_BY_ID, eventEffectSaga);
  yield takeLatest(EVENT_SCAN, eventEffectSaga);
}

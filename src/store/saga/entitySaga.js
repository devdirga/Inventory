import {takeLatest, call, put} from 'redux-saga/effects';
import api from '../api/entity';

import {Messaging} from '../../common';
import {
  ENTITY_GET,
  ENTITY_SET_LIST,
  ENTITY_GET_BY_ID,
  ENTITY_LOADING,
  ENTITY_GET_MEMBER,
  ENTITY_SET_MEMBER,
} from '../constant';

function* entityEffectSaga(action) {
  yield put({type: ENTITY_LOADING, loading: true});
  try {
    switch (action.type) {
      case ENTITY_GET:
        {
          let {data} = yield call(api.get, action.payload);
          if (data.success) {
            yield put({
              type: ENTITY_SET_LIST,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: ENTITY_SET_LIST,
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
          yield put({type: ENTITY_LOADING, loading: false});
        }
        break;
      case ENTITY_GET_BY_ID:
        {
          let {data} = yield call(api.getByID, action.payload);
          if (action.callback) {
            action.callback(data);
          }
          yield put({type: ENTITY_LOADING, loading: false});
        }
        break;
      case ENTITY_GET_MEMBER:
        {
          let {data} = yield call(api.getMember, action.payload);
          if (data.success) {
            yield put({
              type: ENTITY_SET_MEMBER,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: ENTITY_SET_MEMBER,
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
          yield put({type: ENTITY_LOADING, loading: false});
        }
        break;
      default:
        break;
    }
  } catch (e) {
    Messaging.showMessage({
      message: 'Error on calling entity api',
      type: Messaging.types.DANGER,
    });
    yield put({type: ENTITY_LOADING, loading: false});
  }
}

export function* entityWatcherSaga() {
  yield takeLatest(ENTITY_GET, entityEffectSaga);
  yield takeLatest(ENTITY_GET_BY_ID, entityEffectSaga);
  yield takeLatest(ENTITY_GET_MEMBER, entityEffectSaga);
}

import {takeLatest, call, put} from 'redux-saga/effects';
import api from '../api/location';

import {Messaging} from '../../common';
import {LOCATION_LOADING, LOCATION_GET, LOCATION_SET_LIST} from '../constant';

function* locationEffectSaga(action) {
  if (!action.ignoreLoading) {
    yield put({type: LOCATION_LOADING, loading: true});
  }
  try {
    switch (action.type) {
      case LOCATION_GET:
        {
          let {data} = yield call(api.get, action.payload);
          if (data.success) {
            yield put({
              type: LOCATION_SET_LIST,
              payload: {
                data: data.data,
                reset: action.payload.skip ? false : true,
              },
            });
          } else {
            // reset list if get not success
            yield put({
              type: LOCATION_SET_LIST,
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
          yield put({type: LOCATION_LOADING, loading: false});
        }
        break;
      default:
        break;
    }
  } catch (e) {
    Messaging.showMessage({
      message: 'Error on calling location api',
      type: Messaging.types.DANGER,
    });
    yield put({type: LOCATION_LOADING, loading: false});
  }
}

export function* locationWatcherSaga() {
  yield takeLatest(LOCATION_GET, locationEffectSaga);
}

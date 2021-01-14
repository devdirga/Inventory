import { all, fork } from 'redux-saga/effects';
import { pokeWatcherSaga } from './pokeSaga';
import { authWatcherSaga } from './authSaga';
import { userWatcherSaga } from './userSaga';
import { entityWatcherSaga } from './entitySaga';
import { activityTypeWatcherSaga } from './activityTypeSaga';
import { activityWatcherSaga } from './activitySaga';
import { eventWatcherSaga } from './eventSaga';
import { surveyWatcherSaga } from './surveySaga';
import { locationWatcherSaga } from './locationSaga';
import { productWatcherSaga } from './productSaga'

export function* rootSaga() {
  yield all([
    fork(authWatcherSaga),
    fork(pokeWatcherSaga),
    fork(userWatcherSaga),
    fork(entityWatcherSaga),
    fork(activityTypeWatcherSaga),
    fork(activityWatcherSaga),
    fork(eventWatcherSaga),
    fork(surveyWatcherSaga),
    fork(productWatcherSaga),
    fork(locationWatcherSaga),
  ]);
}

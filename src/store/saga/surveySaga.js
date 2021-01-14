import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../api/survey';
import { Messaging } from '../../common';
import { SURVEY_GET_BY_ID } from '../constant';

function* surveyEffectSaga(action) {
    try {
        switch (action.type) {
            case SURVEY_GET_BY_ID:
                {
                    let { data } = yield call(api.getByID, action.payload);
                    if (action.callback) {
                        action.callback(data);
                    }
                }
                break;
            default:
                break;
        }

    } catch (error) {
        Messaging.showMessage({
            message: 'Error on calling entity api',
            type: Messaging.types.DANGER,
        });
    }
}

export function* surveyWatcherSaga() {
    yield takeLatest(SURVEY_GET_BY_ID, surveyEffectSaga);
}
import { takeLatest, call, put } from 'redux-saga/effects';
import api from '../api/product';
import { Messaging } from '../../common';
import { PRODUCT_GET_BY_ID } from '../constant';

function* productEffectSaga(action) {
    try {
        switch (action.type) {
            case PRODUCT_GET_BY_ID:
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
            message: 'Error on calling product api',
            type: Messaging.types.DANGER,
        });
    }
}

export function* productWatcherSaga() {
    yield takeLatest(PRODUCT_GET_BY_ID, productEffectSaga);
}
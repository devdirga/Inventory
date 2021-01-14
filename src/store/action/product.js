import {
    PRODUCT_GET_BY_ID
} from '../constant';

export function productGetByID(id, callback) {
    return {
        type: PRODUCT_GET_BY_ID,
        payload: id,
        callback: callback,
    };
}
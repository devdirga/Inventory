import {
    SURVEY_GET_BY_ID
} from '../constant';

export function surveyGetByID(id, callback) {
    return {
        type: SURVEY_GET_BY_ID,
        payload: id,
        callback: callback,
    };
}
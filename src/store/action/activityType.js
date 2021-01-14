import {ACTIVITY_TYPE_GET} from '../constant';

export function activityTypeGetList(payload, callback) {
  return {
    type: ACTIVITY_TYPE_GET,
    payload,
    callback: callback,
  };
}

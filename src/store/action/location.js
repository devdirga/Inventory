import {LOCATION_GET} from '../constant';

export function locationGetList(payload, callback, ignoreLoading) {
  return {
    type: LOCATION_GET,
    payload,
    callback: callback,
    ignoreLoading: ignoreLoading,
  };
}

import {ACTIVITY_GET, ACTIVITY_GET_RECENT, ACTIVITY_LOADING} from '../constant';

export function activitySetLoading(isLoading = false) {
  return {
    type: ACTIVITY_LOADING,
    loading: isLoading,
  };
}

export function activityGetList(payload, callback, ignoreLoading) {
  return {
    type: ACTIVITY_GET,
    payload,
    callback: callback,
    ignoreLoading: ignoreLoading,
  };
}

export function activityGetRecentList({entityID, userID}, callback) {
  return {
    type: ACTIVITY_GET_RECENT,
    payload: {
      entityID,
      userID,
    },
    callback: callback,
  };
}

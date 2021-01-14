import {
  USER_GET_ME,
  USER_SET_LOCATION,
  USER_CHANGE_PASSWORD,
  USER_CHANGE_PROFILE,
  USER_GET_LOCATION_LIST,
  USER_SET_ENTITY,
  USER_GET,
  USER_GET_SUBSCRIPTION,
  USER_SET_SUBSCRIPTION_STATUS,
} from '../constant';

export function userGetList(payload, callback) {
  return {
    type: USER_GET,
    payload,
    callback: callback,
  };
}

export function userGetMe(callback) {
  return {
    type: USER_GET_ME,
    callback: callback,
  };
}

export function userGetLocationList(payload) {
  return {
    type: USER_GET_LOCATION_LIST,
    payload,
  };
}

export function userSetEntity(payload) {
  return {
    type: USER_SET_ENTITY,
    payload,
  };
}

export function userSetLocation(payload) {
  return {
    type: USER_SET_LOCATION,
    payload,
  };
}

export function userChangeProfile(payload, callback) {
  return {
    type: USER_CHANGE_PROFILE,
    payload,
    callback: callback,
  };
}

export function userChangePassword(payload, callback) {
  return {
    type: USER_CHANGE_PASSWORD,
    payload,
    callback: callback,
  };
}

export function userGetSubscription(entityID, callback) {
  return {
    type: USER_GET_SUBSCRIPTION,
    payload: entityID,
    callback: callback,
  };
}

export function userSetSubscriptionStatus(status) {
  return {
    type: USER_SET_SUBSCRIPTION_STATUS,
    payload: status,
  };
}

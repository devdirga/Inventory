import {ENTITY_GET, ENTITY_GET_BY_ID, ENTITY_GET_MEMBER} from '../constant';

export function entityGetList(payload, callback) {
  return {
    type: ENTITY_GET,
    payload,
    callback: callback,
  };
}

export function entityGetByID(payload, callback) {
  return {
    type: ENTITY_GET_BY_ID,
    payload,
    callback: callback,
  };
}

export function entityGetMember(payload, callback) {
  return {
    type: ENTITY_GET_MEMBER,
    payload,
    callback: callback,
  };
}

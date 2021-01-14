import {
  EVENT_GET,
  EVENT_INSERT_DATA,
  EVENT_GET_BY_ID,
  EVENT_UPDATE_DATA,
  EVENT_SCAN,
} from '../constant';

export function eventGetList(payload, callback, ignoreLoading) {
  console.log('event payload', payload)
  return {
    type: EVENT_GET,
    payload,
    callback: callback,
    ignoreLoading: ignoreLoading,
  };
}

export function eventGetByID(id, callback) {
  return {
    type: EVENT_GET_BY_ID,
    payload: id,
    callback: callback,
  };
}

export function eventInsert(payload, callback) {
  return {
    type: EVENT_INSERT_DATA,
    payload,
    callback: callback,
  };
}

export function eventUpdate(payload, callback) {
  return {
    type: EVENT_UPDATE_DATA,
    payload,
    callback: callback,
  };
}

export function eventScan({ barcode }, callback) {
  return {
    type: EVENT_SCAN,
    payload: { barcode },
    callback: callback,
  };
}

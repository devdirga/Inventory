import {LOCATION_LOADING, LOCATION_SET_LIST} from '../constant';

// Initial State
const initialState = {
  loading: false,
  list: [],
};
// Redux: Counter Reducer
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case LOCATION_SET_LIST: {
      let existing = state.list;
      if (action.payload.reset) {
        existing = action.payload.data;
      } else {
        existing = existing.concat(action.payload.data);
      }
      return {
        ...state,
        list: existing,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default locationReducer;

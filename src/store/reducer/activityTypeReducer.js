import {ACTIVITY_TYPE_SET_LIST, ACTIVITY_TYPE_LOADING} from '../constant';

// Initial State
const initialState = {
  loading: false,
  list: [],
};
// Redux: Counter Reducer
const activityTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_TYPE_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case ACTIVITY_TYPE_SET_LIST: {
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
export default activityTypeReducer;

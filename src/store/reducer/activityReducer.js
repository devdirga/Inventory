import {
  ACTIVITY_SET_LIST,
  ACTIVITY_SET_RECENT_LIST,
  ACTIVITY_LOADING,
} from '../constant';

// Initial State
const initialState = {
  loading: false,
  list: [],
  recentList: [],
};
// Redux: Counter Reducer
const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case ACTIVITY_SET_LIST: {
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
    case ACTIVITY_SET_RECENT_LIST: {
      return {
        ...state,
        recentList: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default activityReducer;

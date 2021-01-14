import {ENTITY_SET_LIST, ENTITY_LOADING, ENTITY_SET_MEMBER} from '../constant';

// Initial State
const initialState = {
  loading: false,
  list: [],
  members: [],
};
// Redux: Counter Reducer
const entityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTITY_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case ENTITY_SET_LIST: {
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
    case ENTITY_SET_MEMBER: {
      let existing = state.members;
      if (action.payload.reset) {
        existing = action.payload.data;
      } else {
        existing = existing.concat(action.payload.data);
      }
      return {
        ...state,
        members: existing,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default entityReducer;

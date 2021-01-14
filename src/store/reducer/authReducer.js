import {AUTH_ERROR, AUTH_SET_TOKEN, AUTH_LOADING} from '../constant';

// Initial State
const initialState = {
  loading: false,
  errorMessage: '',
  token: '',
  username: '',
};
// Redux: Counter Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case AUTH_SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        errorMessage: '',
        loading: false,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        errorMessage: action.message,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default authReducer;

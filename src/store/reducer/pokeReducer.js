import {POKE_ADD_LIST, POKE_FETCH_ERROR, POKE_FETCH_LOADING} from '../constant';

// Initial State
const initialState = {
  loading: false,
  errorMessage: '',
  data: [],
};
// Redux: Counter Reducer
const pokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case POKE_FETCH_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case POKE_ADD_LIST: {
      return {
        ...state,
        data: action.pokemon,
        loading: false,
      };
    }
    case POKE_FETCH_ERROR: {
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
export default pokeReducer;

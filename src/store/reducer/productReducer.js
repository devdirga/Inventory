import { PRODUCT_GET_BY_ID, PRODUCT_SET_LIST } from '../constant';

// Initial State
const initialState = {
    loading: false,
    list: [],
};

// Redux: Counter Reducer
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_SET_LIST: {
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
}

// Exports
export default productReducer;
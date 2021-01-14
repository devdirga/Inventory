import {
  USER_SET_ME,
  USER_SET_LOCATION,
  USER_SET_LOCATION_LIST,
  USER_SET_ENTITY,
  USER_LOADING,
  USER_SET_LIST,
  USER_SET_SUBSCRIPTION,
  USER_SET_SUBSCRIPTION_STATUS,
} from '../constant';

// Initial State
const initialState = {
  loading: false,
  id: '',
  username: '',
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  address: '',
  position: '',
  picture: '',
  lastUpdatedDate: '',
  location: '',
  locationList: [],
  selectedEntity: null,
  list: [],
  subscription: null,
  subscriptionStatus: '',
  isSelfieAuth: ''
};
// Redux: Counter Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case USER_SET_LIST: {
      let existing = state.list;
      let theData = action.payload.data.map((x) => {
        x.name =
          (x.firstName || '') + (x.firstName ? ' ' : '') + (x.lastName || '') ||
          x.email ||
          '';
        return x;
      });
      if (action.payload.reset) {
        existing = theData;
      } else {
        existing = existing.concat(theData);
      }
      return {
        ...state,
        list: existing,
      };
    }
    case USER_SET_ME: {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        address: action.payload.address,
        position: action.payload.position,
        picture: action.payload.picture,
        lastUpdatedDate: action.payload.lastUpdatedDate,
        isSelfieAuth: action.payload.isSelfieAuth
      };
    }
    case USER_SET_LOCATION: {
      return {
        ...state,
        location: action.payload,
      };
    }
    case USER_SET_LOCATION_LIST: {
      return {
        ...state,
        locationList: [...action.payload],
      };
    }
    case USER_SET_ENTITY: {
      return {
        ...state,
        selectedEntity: action.payload,
      };
    }
    case USER_SET_SUBSCRIPTION: {
      return {
        ...state,
        subscription: action.payload,
      };
    }
    case USER_SET_SUBSCRIPTION_STATUS: {
      return {
        ...state,
        subscriptionStatus: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default userReducer;

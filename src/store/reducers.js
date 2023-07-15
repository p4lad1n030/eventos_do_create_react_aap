import { legacy_createStore as createStore, combineReducers } from "redux";

const INITIAL_STATE = {
  userEmail: "",
  userLogin: 0,
};
const reducers = combineReducers({
  isLog: function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "LOG_IN":
        return {
          ...state,
          userEmail: action.payload.userEmail,
          userLogin: 1,
        };
      case "LOG_OUT":
        return {
          ...state,
          userEmail: "",
          userLogin: 0,
        };

      default:
        return state;
    }
  },
});

export function configStore() {
  return createStore(reducers);
}








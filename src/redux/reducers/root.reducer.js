import authReducer from "./auth.reducer";
import { combineReducers } from "redux";
import preferenceReducer from "./preference.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  preference: preferenceReducer,
});

export default rootReducer;

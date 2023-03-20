import authReducer from "./auth.reducer";
import { combineReducers } from "redux";
import preferenceReducer from "./preference.reducer";
import modalReducer from "./modal.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  preference: preferenceReducer,
  modal: modalReducer,
});

export default rootReducer;

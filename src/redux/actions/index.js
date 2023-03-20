//Types
export { SET_AUTH_TOKEN, SET_USER, LOGOUT, RESET } from "./auth.action";
export { SET_PREFERENCES } from "./preference.action";

//Synchornous Functions
export { setAuthToken, logout, resetAuth } from "./auth.action";
export { setPreferences } from "./preference.action";

//Asynchornous Functions
export { thunkSignUp, thunkLogin } from "./auth.action";

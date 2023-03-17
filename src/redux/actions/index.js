//Types
export { SET_AUTH_TOKEN, SET_USER, LOGOUT, RESET } from "./auth.action";

//Synchornous Functions
export { setAuthToken, logout, resetAuth } from "./auth.action";

//Asynchornous Functions
export { thunkSignUp, thunkLogin } from "./auth.action";

//Types
export { SET_AUTH_TOKEN, SET_USER, LOGOUT, RESET } from "./auth.action";
export { SET_PREFERENCES, SET_CATEGORY } from "./preference.action";
export { SET_MODAL_OPEN, SET_MODAL_CLOSE } from "./modal.action";

//Synchornous Functions
export { setAuthToken, logout, resetAuth } from "./auth.action";
export { setPreferences, setCategory } from "./preference.action";
export { setModalOpen, setModalClose } from "./modal.action";

//Asynchornous Functions
export { thunkSignUp, thunkLogin } from "./auth.action";

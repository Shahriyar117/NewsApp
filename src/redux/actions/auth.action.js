import axios from "axios";
import { logError } from "../utils";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_USER = "USER";
export const LOGOUT = "LOGOUT";
export const RESET = "RESET";

export const setAuthToken = (authToken) => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const resetAuth = () => ({
  type: RESET,
});

export const thunkSignUp =
  ({ name, email, password, from }) =>
  async () => {
    const serverUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`;
    try {
      const response = await axios.post(serverUrl, { name, email, password });
      console.log(response);
    } catch (error) {
      logError(error, "auth.actions.thunkSignUp");
    }
  };

export const thunkLogin =
  ({ email, password, from }) =>
  async (dispatch) => {
    const serverUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`;
    try {
      const response = await axios.post(serverUrl, { email, password });
      dispatch(setUser(response.data.data));
      dispatch(setAuthToken(response.data.data._token));
    } catch (error) {
      logError(error, "auth.actions.thunkLogin");
    }
  };

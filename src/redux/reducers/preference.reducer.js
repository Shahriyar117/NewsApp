import { SET_PREFERENCES } from "../actions";

const preState = {
  category: "all",
  country: null,
  language: null,
};

const preferenceReducer = (state = preState, action) => {
  Object.freeze(state);
  const stateDup = { ...state };
  const { type, category, country, language } = action;
  switch (type) {
    case SET_PREFERENCES:
      return { ...stateDup, category, country, language };

    default:
      return state;
  }
};

export default preferenceReducer;

import { SET_PREFERENCES, SET_CATEGORY } from "../actions";

const preState = {
  category: "",
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
    case SET_CATEGORY:
      return { ...stateDup, category };

    default:
      return state;
  }
};

export default preferenceReducer;

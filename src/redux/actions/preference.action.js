export const SET_PREFERENCES = "SET_PREFERENCES";
export const SET_CATEGORY = "SET_CATEGORY";

export const setPreferences = ({ category, country, language }) => ({
  type: SET_PREFERENCES,
  category,
  country,
  language,
});
export const setCategory = ({ category, from }) => ({
  type: SET_CATEGORY,
  category,
});

// export const thunkfetchDataByPreferences =
//   ({ category, country, language, from, search, selected, pageSize }) =>
//   async (dispatch) => {
//     //const serverUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`;
//     try {
//       //const response = await axios.get(serverUrl);
//       const response = await axios.get(
//         `https://newsapi.org/v2/top-headlines?q=${search}&sortBy=${selected}&pageSize=${pageSize}&country=${country}&category=${category}&language=${language}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
//       );
//       return response;
//     } catch (error) {
//       logError(error, "preference.actions.thunkfetchDataByPreferences");
//     }
//   };

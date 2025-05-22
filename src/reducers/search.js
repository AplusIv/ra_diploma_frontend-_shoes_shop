import {
  CHANGE_SEARCHFIELD,
  SEARCH_PRODUCTS,
  TOGGLE_VISIBILITY,
} from "../constants/actions";

const initialState = {
  invisibleSearchField: true,
  searchField: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return {
        ...state,
        searchField: action.text,
      };

    // case SEARCH_PRODUCTS:
    //   if (state.searchField && state.invisibleSearchField == false) {
    //     console.log("redirect");

    //   }
    //   return {
    //     ...state,
    //     invisibleSearchField: !state.invisibleSearchField,
    //   };

    case TOGGLE_VISIBILITY:
      return {
        ...state,
        invisibleSearchField: !state.invisibleSearchField,
      };

    default:
      return state;
  }
};

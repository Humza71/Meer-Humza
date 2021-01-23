import { createSlice } from "@reduxjs/toolkit";
import { THEMES } from "../../constants";

const initialState = {
  currentTheme: THEMES.DEFAULT,
};

// export default function reducer(state = initialState, actions) {
//   switch (actions.type) {
//     case types.THEME_SET:
//       return {
//         ...state,
//         currentTheme: actions.payload,
//       };

//     default:
//       return state;
//   }
// }

export const slice = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;

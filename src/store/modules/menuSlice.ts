import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from "@/router/index";
export const menuSlice = createSlice({
  name: "menus",
  initialState: {
    menusResult: [...routes],
  },
  reducers: {
    setMenus: (state, actions) => {
      const result = actions.payload;
      state.menusResult = result;
    },
  },
});

export const selectStoreMenus = (state: any) => {
  console.log(state, "state");
  return state.menus.menusResult;
};

export const { setMenus } = menuSlice.actions;

export default menuSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./modules/tagSlice";
import menusReducer from "./modules/menuSlice";

export default configureStore({
  reducer: {
    tag: tagReducer,
    menus: menusReducer,
  },
});

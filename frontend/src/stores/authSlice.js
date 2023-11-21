import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  activated: false,
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { data } = action.payload;
      state.user = data.user;
      state.role = data.role;
      if (data === null || !data.auth) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
      if (data.activated) {
        state.activated = true;
      }
    },
    clearAuth(state, action) {
      state.isAuth = false;
      state.user = null;
      state.activated = false;
      state.role = "";
    },
    setActivate(state, action){
      state.activated = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setAuth , clearAuth,setActivate} = authSlice.actions;

export default authSlice.reducer;

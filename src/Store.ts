// store.ts
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    postSuccess: () => {
      // This action doesn't need to modify the state, it's just a signa
    },
  },
});

export const { signIn, signOut, postSuccess } = userSlice.actions;

export const selectUserInfo = (state: { user: UserState }) =>
  state.user.userInfo;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;

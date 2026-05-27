import { createSlice } from '@reduxjs/toolkit';
import {
  checkSessionThunk,
  loginThunk,
  registerThunk,
  logoutThunk,
  updateUserThunk,
} from './userThunks';

export const UserSlice = Object.freeze({
  NAME: 'user',
  DATA: 'userData',
});

const initialState = {
  [UserSlice.DATA]: null,
  sessionLoaded: false,
  isPending: false,
};

export const userSlice = createSlice({
  name: UserSlice.NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSessionThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.userData = action.payload;
        state.sessionLoaded = true;
      })
      .addCase(checkSessionThunk.rejected, (state) => {
        state.isPending = false;
        state.sessionLoaded = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.userData = action.payload;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.userData = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isPending = false;
        state.userData = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.userData = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
        (state) => {
          state.isPending = true;
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state) => {
          state.isPending = false;
        },
      );
  },
});

export default userSlice.reducer;
